package edu.yu.cs.com1320.project.stage5.impl;

import edu.yu.cs.com1320.project.CommandSet;
import edu.yu.cs.com1320.project.GenericCommand;
import edu.yu.cs.com1320.project.Undoable;
import edu.yu.cs.com1320.project.impl.BTreeImpl;
import edu.yu.cs.com1320.project.impl.MinHeapImpl;
import edu.yu.cs.com1320.project.impl.StackImpl;
import edu.yu.cs.com1320.project.impl.TrieImpl;
import edu.yu.cs.com1320.project.stage5.Document;
import edu.yu.cs.com1320.project.stage5.DocumentStore;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DocumentStoreImpl implements DocumentStore {
    private BTreeImpl<URI,Document> documents;
    private StackImpl<Undoable> commandStack;
    private TrieImpl<URI> documentTrie;
    private MinHeapImpl<DocPacket> documentMinHeap;
    private Set<URI> onDisk;
    private int docCounter;
    private int totalBytes;
    private int maxDocCount;
    private int maxTotalDocBytes;
    private class DocPacket implements Comparable<DocPacket>{
        private URI uri;
        private BTreeImpl<URI, Document> bTree;
        private DocPacket(URI uri, BTreeImpl currentBTree){
            this.uri = uri;
            this.bTree = currentBTree;
        }
        @Override
        public int compareTo(DocPacket o) {
            return Long.compare(this.bTree.get(this.uri).getLastUseTime(), this.bTree.get(o.uri).getLastUseTime());
        }

        @Override
        public boolean equals(Object o) {
            if(!(o instanceof DocPacket)) return false;
            return this.uri.equals(((DocPacket)o).uri);
        }
    }
    public DocumentStoreImpl(){
        this(new File(System.getProperty("user.dir")));
    }
    public DocumentStoreImpl(File baseDir){
        this.documents = new BTreeImpl<>();
        this.documents.put(URI.create(""),null);
        this.commandStack = new StackImpl<>();
        this.documentTrie = new TrieImpl<>();
        this.documentMinHeap = new MinHeapImpl<>();
        this.onDisk = new HashSet<>();
        this.maxDocCount = Integer.MAX_VALUE;
        this.maxTotalDocBytes = Integer.MAX_VALUE;
        this.docCounter = 0;
        this.totalBytes = 0;
        this.documents.setPersistenceManager(new DocumentPersistenceManager(baseDir));
    }

    @Override
    public int putDocument(InputStream input, URI uri, DocumentFormat format) throws IOException {
        if (input == null){
            int documentHashCode = this.documents.get(uri) == null ? 0 : this.getDocument(uri).hashCode();
            this.deleteDocument(uri);
            return documentHashCode;
        }
        if(uri == null || format == null) throw new IllegalArgumentException("URI or Format is null");
        byte[] receivedInput = input.readAllBytes();
        boolean isOnDisk = this.onDisk.contains(uri);
        Document oldDoc = this.documents.get(uri);
        int oldDocHashCode = oldDoc == null ? 0:oldDoc.hashCode();
        if(oldDoc != null) {
            if(!isOnDisk) this.removeFromMinHeap(oldDoc);
            else this.onDisk.remove(uri);
            this.deleteAllWordsToTrie(oldDoc);
        }
        Document addedDoc = format == DocumentFormat.BINARY ? new DocumentImpl(uri,receivedInput):new DocumentImpl(uri,new String(receivedInput), null);
        this.documents.put(uri, addedDoc);
        URI pushedOut = this.addToMinHeap(addedDoc);
        this.addAllWordsToTrie(addedDoc);
        this.commandStack.push(new GenericCommand<>(uri, x -> {
            boolean addedDocOnDisk = this.onDisk.contains(uri);
            this.deleteAllWordsToTrie(addedDoc);
            if(!addedDocOnDisk) this.removeFromMinHeap(addedDoc);
            this.getDocument(pushedOut);
            return this.deleteCommand(x,oldDoc,isOnDisk);
        }));
        return oldDocHashCode;
    }

    @Override
    public Document getDocument(URI uri) {
        if(uri == null) return null;
        boolean isOnDisk = this.onDisk.contains(uri);
        Document a = this.documents.get(uri);
        if(a != null){
            a.setLastUseTime(System.nanoTime());
            if(!isOnDisk) {
                this.documentMinHeap.reHeapify(new DocPacket(uri,this.documents));
            }else{
                this.exceedsLimit(1,this.getAllBytes(a));
                this.documentMinHeap.insert(new DocPacket(uri,this.documents));
                this.onDisk.remove(a.getKey());
            }
        }
        return a;
    }

    @Override
    public boolean deleteDocument(URI uri) {
        if(uri == null) return false;
        boolean isOnDisk = this.onDisk.contains(uri);
        Document oldDoc = this.documents.get(uri);
        if(oldDoc == null) return false;
        if(!isOnDisk) this.removeFromMinHeap(oldDoc);
        else this.onDisk.remove(uri);
        this.documents.put(uri,null);
        this.deleteAllWordsToTrie(oldDoc);
        this.commandStack.push(new GenericCommand<>(uri, x -> this.deleteCommand(x,oldDoc, isOnDisk)));
        return true;
    }
    private boolean deleteCommand(URI uri, Document oldDoc, boolean isOnDisk){
        this.documents.put(uri, oldDoc);
        if(oldDoc == null) return true;
        this.addAllWordsToTrie(oldDoc);
        boolean worked = true;
        if(isOnDisk) {
            try {
                this.documents.moveToDisk(uri);
                this.onDisk.add(uri);
            } catch (IOException e) {
                worked = false;
            }
        }else{
            this.addToMinHeap(oldDoc);
        }
        return worked;
    }
    private void addAllWordsToTrie(Document doc){
        if(doc != null){
            for(String a:doc.getWords()){
                this.documentTrie.put(a,doc.getKey());
            }
        }
    }
    private void deleteAllWordsToTrie(Document doc){
        if (doc != null) {
            for (String a : doc.getWords()) {
                this.documentTrie.delete(a,doc.getKey());
            }
        }
    }
    @Override
    public List<Document> search(String keyword) {
        if(keyword == null) return new ArrayList<>();
        List<URI> sortedURIList = this.documentTrie.getAllSorted(keyword.toLowerCase(),
                (o1, o2) -> this.documents.get(o2).wordCount(keyword) - this.documents.get(o1).wordCount(keyword));
        List<Document> sortedDocList = new ArrayList<>();
        for(URI a:sortedURIList){
            Document currentDoc = this.getDocument(a);
            sortedDocList.add(currentDoc);
            currentDoc.setLastUseTime(System.nanoTime());
            this.documentMinHeap.reHeapify(new DocPacket(a,this.documents));
        }
        return sortedDocList;
    }

    @Override
    public List<Document> searchByPrefix(String keywordPrefix) {
        if(keywordPrefix == null) return new ArrayList<>();
        List<URI> sortedURIList = this.documentTrie.getAllWithPrefixSorted(keywordPrefix.toLowerCase(), (o1, o2) -> {
            int totalDoc1 = 0;
            int totalDoc2 = 0;
            Document o1Doc = this.documents.get(o1);
            Document o2Doc = this.documents.get(o2);
            for (String a : o1Doc.getWords()) {
                if (a.startsWith(keywordPrefix.toLowerCase())) totalDoc1 += o1Doc.wordCount(a);
            }
            for (String a : o2Doc.getWords()) {
                if (a.startsWith(keywordPrefix.toLowerCase())) totalDoc2 += o2Doc.wordCount(a);
            }
            return (totalDoc2 - totalDoc1);
        });
        List<Document> sortedDocList = new ArrayList<>();
        for(URI a:sortedURIList){
            Document currentDoc = this.getDocument(a);
            sortedDocList.add(currentDoc);
            currentDoc.setLastUseTime(System.nanoTime());
            this.documentMinHeap.reHeapify(new DocPacket(a,this.documents));
        }
        return sortedDocList;
    }

    @Override
    public Set<URI> deleteAll(String keyword) {
        if(keyword == null || keyword.equals("")) return new HashSet<>();
        Set<URI> allDocsWithKeyWord = this.documentTrie.deleteAll(keyword.toLowerCase());
        return deleteDocumentSet(allDocsWithKeyWord,keyword.toLowerCase(),false);
    }

    @Override
    public Set<URI> deleteAllWithPrefix(String keywordPrefix) {
        if(keywordPrefix == null || keywordPrefix.equals("")) return new HashSet<>();
        Set<URI> allDocsWithPrefix = this.documentTrie.deleteAllWithPrefix(keywordPrefix.toLowerCase());
        return deleteDocumentSet(allDocsWithPrefix,keywordPrefix.toLowerCase(),true);
    }

    private Set<URI> deleteDocumentSet(Set<URI> uriSet, String keyword, boolean prefix){
        Set<URI> allURIsWithKeyWord = new HashSet<>();
        CommandSet<URI> commandSet = new CommandSet<>();
        for(URI e: uriSet){
            boolean isOnDisk = this.onDisk.contains(e);
            Document a = this.documents.get(e);
            for(String b: a.getWords()){
                if((prefix && !b.startsWith(keyword)) || (!prefix && !b.equals(keyword))) this.documentTrie.delete(b,e);
            }
            if(!isOnDisk) this.removeFromMinHeap(a);
            this.documents.put(e,null);
            commandSet.addCommand(new GenericCommand<>(e, x -> this.deleteCommand(x, a, isOnDisk)));
            allURIsWithKeyWord.add(a.getKey());
        }
        this.commandStack.push(commandSet);
        return allURIsWithKeyWord;
    }
    private URI addToMinHeap(Document doc){
        URI pushedOut = this.exceedsLimit(1, this.getAllBytes(doc));
        doc.setLastUseTime(System.nanoTime());
        this.documentMinHeap.insert(new DocPacket(doc.getKey(),this.documents));
        return pushedOut;
    }
    private void removeFromMinHeap(Document doc){
        this.docCounter--;
        this.totalBytes -= this.getAllBytes(doc);
        doc.setLastUseTime(Long.MIN_VALUE);
        this.documentMinHeap.reHeapify(new DocPacket(doc.getKey(),this.documents));
        this.documentMinHeap.remove();
    }
    @Override
    public void setMaxDocumentCount(int limit) {
        if(limit < 0) throw new IllegalArgumentException ("Max cannot be negative.");
        this.maxDocCount = limit;
        this.exceedsLimit(0,0);
    }
    @Override
    public void setMaxDocumentBytes(int limit) {
        if(limit < 0) throw new IllegalArgumentException ("Max cannot be negative.");
        this.maxTotalDocBytes = limit;
        this.exceedsLimit(0,0);
    }
    private URI exceedsLimit(int docsAdded, int bytes){
        if(docsAdded > this.maxDocCount || bytes > this.maxTotalDocBytes) throw new IllegalArgumentException("Document is too large to fit in Store.");
        URI pushedOut = null;
        if((this.docCounter + docsAdded) > this.maxDocCount || (this.totalBytes + bytes) > this.maxTotalDocBytes){
            Document removedDoc = this.documents.get(this.documentMinHeap.remove().uri);
            this.totalBytes -= this.getAllBytes(removedDoc);
            this.docCounter--;
            try {
                this.documents.moveToDisk(removedDoc.getKey());
                this.onDisk.add(removedDoc.getKey());
                pushedOut = removedDoc.getKey();
            } catch (IOException e) {
                e.printStackTrace();
            }
            this.exceedsLimit(docsAdded,bytes);
        }else{
            this.docCounter += docsAdded;
            this.totalBytes += bytes;
        }
        return pushedOut;
    }

    private int getAllBytes(Document doc) {
        return doc.getDocumentTxt() == null ? doc.getDocumentBinaryData().length:doc.getDocumentTxt().getBytes().length;
    }
    @Override
    public void undo() throws IllegalStateException {
        if(this.commandStack.size() == 0) throw new IllegalStateException("There is no action to undo.");
        Undoable top = this.commandStack.peek();
        if(top instanceof CommandSet<?> && ((CommandSet<?>) top).size() == 0){
            this.commandStack.pop();
            this.undo();
        }else{
            this.commandStack.pop().undo();
        }
    }

    @Override
    public void undo(URI uri) throws IllegalStateException {
        StackImpl<Undoable> tempStack = new StackImpl<>();
        this.undo(uri,tempStack);
    }
    private void undo(URI uri,StackImpl<Undoable> tempStack){
        if(this.commandStack.size() == 0){
            while(tempStack.peek() != null){
                this.commandStack.push(tempStack.pop());
            }
            throw new IllegalStateException("There is no action to undo on given uri.");
        }
        Undoable top = this.commandStack.peek();
        if(top instanceof CommandSet<?> && ((CommandSet<URI>) top).containsTarget(uri)){
            ((CommandSet<URI>) top).undo(uri);
            if(((CommandSet<?>) top).size() == 0) this.commandStack.pop();
        }else if(top instanceof GenericCommand<?> && ((GenericCommand<URI>) top).getTarget().equals(uri)){
            this.commandStack.pop().undo();
        }else{
            tempStack.push(this.commandStack.pop());
            this.undo(uri,tempStack);
            this.commandStack.push(tempStack.pop());
        }
    }
}