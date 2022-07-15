package edu.yu.cs.com1320.project.stage4;

import edu.yu.cs.com1320.project.stage5.DocumentStore;
import edu.yu.cs.com1320.project.stage5.impl.DocumentStoreImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class DocumentStoreImpl4Test {
    private DocumentStoreImpl store;
    //variables to hold possible values for doc1
    private URI uri1;
    private String txt1;

    //variables to hold possible values for doc2
    private URI uri2;
    private String txt2;

    //variables to hold possible values for doc3
    private URI uri3;
    private String txt3;

    //variables to hold possible values for doc4
    private URI uri4;
    private String txt4;

    @BeforeEach
    public void init() throws Exception {
        //init possible values for doc1
        this.uri1 = new URI("http://edu.yu.cs/com1320/project/doc1");
        this.txt1 = "the text of doc1, in plain text. No fancy file format - just plain old String. Computer. Headphones.";

        //init possible values for doc2
        this.uri2 = new URI("http://edu.yu.cs/com1320/project/doc2");
        this.txt2 = "Text for doc2. A plain old String. this";

        //init possible values for doc3
        this.uri3 = new URI("http://edu.yu.cs/com1320/project/doc3");
        this.txt3 = "the text of doc3, this is";

        //init possible values for doc4
        this.uri4 = new URI("http://edu.yu.cs/com1320/project/doc4");
        this.txt4 = "This is the text of doc4 this";
    }
    private void setStoreWithTextAdded() throws IOException {
        this.store = new DocumentStoreImpl();
        store.putDocument(new ByteArrayInputStream(this.txt1.getBytes()),this.uri1, DocumentStore.DocumentFormat.TXT);
        store.putDocument(new ByteArrayInputStream(this.txt2.getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);
        store.putDocument(new ByteArrayInputStream(this.txt3.getBytes()),this.uri3, DocumentStore.DocumentFormat.TXT);
        store.putDocument(new ByteArrayInputStream(this.txt4.getBytes()),this.uri4, DocumentStore.DocumentFormat.TXT);
    }

    private void setStoreWithBinaryAdded() throws IOException {
        this.store = new DocumentStoreImpl();
        store.putDocument(new ByteArrayInputStream("computer t".getBytes()),this.uri1, DocumentStore.DocumentFormat.TXT);
        store.putDocument(new ByteArrayInputStream("the text of doc3, this is".getBytes()),this.uri3, DocumentStore.DocumentFormat.BINARY);
        store.putDocument(new ByteArrayInputStream("for doc2. this".getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);
        store.putDocument(new ByteArrayInputStream("this ".getBytes()),this.uri4, DocumentStore.DocumentFormat.BINARY);
    }
    /*
     * 1. Ensure that docCount is set and reacts properly when there is an overflow (completely removes the least recently used
     *      doc).
     *  1a. Ensure previous undo is called
     *  1b. Ensure is removed from command set of undos
     *  1c.
     * 2. When set to amount less than what is currently in DS, removes all necessary documents
     * 3. When set to below zero, throws an IAE
     * 4. Need to check that get, put, and undo update time and nothing else.
     * 5. Test when both setters have been set, that DS reacts when either setter is met
     */
    @Test
    void setMaxDocumentCount() throws IOException {
        //Set up store
        this.setStoreWithTextAdded();

        //set max docs to 5
        this.store.setMaxDocumentCount(5);

        //Add one more doc so we are now at max
        this.store.putDocument(new ByteArrayInputStream((("AAAAAAAA")).getBytes()),URI.create("/com.A"), DocumentStore.DocumentFormat.TXT);

        //ensure least recently used doc is present in trie and hashmap
        assertEquals(this.store.getDocument(this.uri1),this.store.search("CoMpUtEr").get(0));

        //make first doc least recently used again
        this.store.getDocument(this.uri2);
        this.store.getDocument(this.uri3);
        this.store.getDocument(this.uri4);
        this.store.getDocument(URI.create("/com.A"));

        //Put new doc, thus going over limit
        this.store.putDocument(new ByteArrayInputStream((("BBBBBBBB")).getBytes()),URI.create("/com.imageB"), DocumentStore.DocumentFormat.BINARY);

        //Ensure least recently used doc is erased from hashmap/DS, trie, commandStack
        assertNull(this.store.getDocument(this.uri1));
        assertEquals(0,this.store.search("CoMpUtEr").size());
        assertThrows(IllegalStateException.class, () -> this.store.undo(this.uri1));

        //update time of txt2 by calling get and ensure that a put of a new document removes doc3
        this.store.getDocument(this.uri2);
        this.store.putDocument(new ByteArrayInputStream(this.txt1.getBytes()),this.uri1, DocumentStore.DocumentFormat.TXT);
        assertNotNull(this.store.getDocument(this.uri2));
        assertNull(this.store.getDocument(this.uri3));
        assertEquals(0,this.store.search("DOC3").size());
    }
    @Test
    void setMaxDocumentCountToLessThanCurrent() throws IOException {
        this.setStoreWithTextAdded();
        assertEquals(3,this.store.search("this").size());
        this.store.getDocument(this.uri1);
        this.store.setMaxDocumentCount(1);
        assertNull(this.store.getDocument(this.uri2));
        assertNull(this.store.getDocument(this.uri3));
        assertNull(this.store.getDocument(this.uri4));
        assertEquals(0,this.store.search("this").size());
    }
    @Test
    void setMaxDocumentCountToLessThanZeroOr0() throws IOException {
        this.setStoreWithBinaryAdded();
        assertThrows(IllegalArgumentException.class, () -> store.setMaxDocumentCount(-1));
        this.setStoreWithTextAdded();
        this.store.setMaxDocumentCount(0);
        assertEquals(0,this.store.searchByPrefix("t").size());
        assertNull(this.store.getDocument(this.uri1));
        assertNull(this.store.getDocument(this.uri2));
        assertNull(this.store.getDocument(this.uri3));
        assertNull(this.store.getDocument(this.uri4));
        assertThrows(IllegalStateException.class, () -> this.store.undo());
    }

    @Test
    void checkUndoFromCommandSetDocCounter() throws IOException {
        //setup with four text docs
        this.setStoreWithTextAdded();

        // remove three via a deleteAllWithPrefix call
        this.store.deleteAll("this");

        //Add one of those three back via put
        this.store.putDocument(new ByteArrayInputStream(this.txt3.getBytes()),this.uri3, DocumentStore.DocumentFormat.TXT);

        // update time of first doc
        this.store.getDocument(this.uri1);

        //Make max doc counter 2 and add another doc
        this.store.setMaxDocumentCount(1);

        //Ensure one of the reput doc is deleted from commandSet
        assertEquals(this.txt1,this.store.getDocument(this.uri1).getDocumentTxt());
        assertNull(this.store.getDocument(this.uri3));
        assertThrows(IllegalStateException.class, () -> this.store.undo(this.uri3));
        this.store.setMaxDocumentCount(4);
        this.store.undo();
        assertEquals(3,this.store.searchByPrefix("t").size());
        this.store.undo();
        this.store.undo();
        this.store.undo();
        assertEquals(0,this.store.searchByPrefix("t").size());
        assertThrows(IllegalStateException.class, () -> this.store.undo());
    }

    @Test
    void setMaxDocumentBytes() throws IOException {
        //Set up store
        this.store = new DocumentStoreImpl();
        store.putDocument(new ByteArrayInputStream("computer t".getBytes()),this.uri1, DocumentStore.DocumentFormat.TXT);//10
        store.putDocument(new ByteArrayInputStream("the text of doc3, this is".getBytes()),this.uri3, DocumentStore.DocumentFormat.TXT);//25
        store.putDocument(new ByteArrayInputStream("for doc2. this ".getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);//15
        store.putDocument(new ByteArrayInputStream("this ".getBytes()),this.uri4, DocumentStore.DocumentFormat.TXT);//5

        //set max bytes to 65
        this.store.setMaxDocumentBytes(65);

        //Add one more doc so we are now at max
        this.store.putDocument(new ByteArrayInputStream(new byte[10]),URI.create("/com.A"), DocumentStore.DocumentFormat.TXT);

        //ensure least recently used doc is present in trie and hashmap
        assertEquals(this.store.getDocument(this.uri1),this.store.search("CoMpUtEr").get(0));

        //make first doc least recently used again
        this.store.getDocument(this.uri3);
        this.store.getDocument(this.uri2);
        this.store.getDocument(this.uri4);
        this.store.getDocument(URI.create("/com.A"));

        //Put new doc, thus going over limit
        this.store.putDocument(new ByteArrayInputStream(new byte[5]),URI.create("/com.imageB"), DocumentStore.DocumentFormat.BINARY);

        //Ensure least recently used doc is erased from hashmap/DS, trie, commandStack
        assertNull(this.store.getDocument(this.uri1));
        assertEquals(0,this.store.search("CoMpUtEr").size());
        assertThrows(IllegalStateException.class, () -> this.store.undo(this.uri1));

        //update time of txt3 by calling get and ensure that a put of a new document removes doc3
        this.store.getDocument(this.uri3);
        this.store.putDocument(new ByteArrayInputStream(new byte[20]),this.uri1, DocumentStore.DocumentFormat.TXT);
        assertNotNull(this.store.getDocument(this.uri3));
        assertNull(this.store.getDocument(this.uri2));
        assertEquals(0,this.store.search("DOC2").size());

    }
    @Test
    void setMaxDocumentBytesToLessThanCurrent() throws IOException {
        this.setStoreWithBinaryAdded();
        this.store.setMaxDocumentBytes(15);
        assertNull(this.store.getDocument(this.uri2));
        assertNull(this.store.getDocument(this.uri3));
        assertNull(this.store.getDocument(this.uri1));
        assertEquals(0,this.store.search("this").size());
    }
    @Test
    void setMaxDocumentBytesToLessThanZeroAnd0() throws IOException {
        this.setStoreWithBinaryAdded();
        assertThrows(IllegalArgumentException.class, () -> store.setMaxDocumentBytes(-1));
        this.setStoreWithTextAdded();
        this.store.setMaxDocumentBytes(0);
        assertEquals(0,this.store.searchByPrefix("t").size());
        assertNull(this.store.getDocument(this.uri1));
        assertNull(this.store.getDocument(this.uri2));
        assertNull(this.store.getDocument(this.uri3));
        assertNull(this.store.getDocument(this.uri4));
        assertThrows(IllegalStateException.class, () -> this.store.undo());
    }
    @Test
    void checkUndoFromCommandSetBytes() throws IOException {
        //setup with four text docs
        this.setStoreWithBinaryAdded();

        // remove two via a deleteAllWithPrefix call
        this.store.deleteAllWithPrefix("t");

        //Add one of those two back via put
        this.store.putDocument(new ByteArrayInputStream(this.txt2.getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);

        // update time of first docs
        this.store.getDocument(this.uri3);
        this.store.getDocument(this.uri4);

        //Make max doc counter 3 and add another doc
        this.store.setMaxDocumentBytes(45);
        this.store.putDocument(new ByteArrayInputStream((("AAAAAAAAAA")).getBytes()),URI.create("/com.A"), DocumentStore.DocumentFormat.TXT);

        //Ensure one of the reput doc is deleted from commandSet
        assertNull(this.store.getDocument(this.uri3).getDocumentTxt());
        assertNull(this.store.getDocument(this.uri2));
        assertThrows(IllegalStateException.class, () -> {
            this.store.undo(this.uri2);
        });
        this.store.undo();
        assertEquals(0,this.store.searchByPrefix("t").size());
        this.store.undo();
        assertNull(this.store.getDocument(this.uri2));
        this.store.undo();
        this.store.undo();
        this.store.undo();
        assertEquals(0,this.store.searchByPrefix("t").size());
        assertThrows(IllegalStateException.class, () -> this.store.undo());
    }
    @Test
    void checkGetPutUndoUpdateTime() {
    }
    @Test
    void bothSettersSet() throws IOException {
        this.store = new DocumentStoreImpl();
        this.store.setMaxDocumentBytes(25);
        this.store.setMaxDocumentCount(2);

        store.putDocument(new ByteArrayInputStream("computer t".getBytes()),this.uri1, DocumentStore.DocumentFormat.TXT);//10
        store.putDocument(new ByteArrayInputStream("for doc2. this-".getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);//15

        store.putDocument(new ByteArrayInputStream("the text of doc3, this is".getBytes()),this.uri3, DocumentStore.DocumentFormat.BINARY);//25

        assertNull(this.store.getDocument(this.uri1));
        assertNull(this.store.getDocument(this.uri2));
        assert Arrays.equals("the text of doc3, this is".getBytes(), this.store.getDocument(this.uri3).getDocumentBinaryData());
    }
}