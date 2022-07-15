package edu.yu.cs.com1320.project.stage5.impl;

import edu.yu.cs.com1320.project.stage5.Document;
import java.net.URI;
import java.util.*;

public class DocumentImpl implements Document {
    private final URI uri;
    private String txt = null;
    private long lastUse = 0;
    private byte[] binaryData = null;
    private Map<String,Integer> wordMap = new HashMap<>();
    public DocumentImpl(URI uri, String txt, Map<String, Integer> wordCountMap){
        if(uri == null || txt == null || uri.toASCIIString().isBlank() || txt.length() == 0){
            throw new IllegalArgumentException("Invalid inputs");
        }
        this.uri = uri;
        this.txt = txt;
        this.wordMap = wordCountMap == null ? this.makeMap(txt):wordCountMap;
    }
    public DocumentImpl(URI uri, byte[] binaryData){
        if(uri == null || binaryData == null || uri.toASCIIString().isBlank() || binaryData.length == 0){
            throw new IllegalArgumentException("Invalid inputs");
        }
        this.uri = uri;
        this.binaryData = binaryData;
    }
    private HashMap<String, Integer> makeMap(String text){
        HashMap<String, Integer> currentMap = new HashMap<>();
        String[] sanitizedText = text.replaceAll("[^a-zA-Z0-9\\s]","").toLowerCase().split(" ");
        for(String a:sanitizedText){
            if(a.equals("")){
                continue;
            }
            if(currentMap.containsKey(a)){
                currentMap.replace(a,currentMap.get(a) + 1);
            }else{
                currentMap.put(a,1);
            }
        }
        return currentMap;
    }
    @Override
    public String getDocumentTxt() {
        return this.txt;
    }

    @Override
    public byte[] getDocumentBinaryData() {
        if(this.binaryData == null){
            return null;
        }
        byte[] copyOfBinaryData = new byte[this.binaryData.length];
        int i = 0;
        for(byte a:this.binaryData){
            copyOfBinaryData[i] = a;
            i++;
        }
        return copyOfBinaryData;
    }

    @Override
    public URI getKey() {
        return this.uri;
    }

    @Override
    public int wordCount(String word) {
        if(word == null){
            throw new IllegalArgumentException("Word given was null");
        }
        return this.txt == null || !this.wordMap.containsKey(word.toLowerCase()) ? 0:this.wordMap.get(word.toLowerCase());
    }

    @Override
    public Set<String> getWords() {
        return this.txt == null ? new HashSet<>():this.wordMap.keySet();
    }

    @Override
    public long getLastUseTime() {
        return this.lastUse;
    }

    @Override
    public void setLastUseTime(long timeInNanoseconds) {
        this.lastUse = timeInNanoseconds;
    }

    @Override
    public Map<String, Integer> getWordMap() {
        HashMap<String, Integer> copy = new HashMap<>();
        for(String a:this.wordMap.keySet()){
            copy.put(a, this.wordMap.get(a));
        }
        return copy;
    }

    @Override
    public void setWordMap(Map<String, Integer> wordMap) {
        this.wordMap = wordMap;
    }

    @Override
    public int hashCode() {
        int result = uri.hashCode();
        result = 31 * result + (txt != null ? txt.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(binaryData);
        return result;
    }
    @Override
    public boolean equals(Object o){
        return this.hashCode() == o.hashCode();
    }

    @Override
    public int compareTo(Document o) {
        return Long.compare(this.getLastUseTime(), o.getLastUseTime());
    }
}
