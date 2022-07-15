package edu.yu.cs.com1320.project.stage5.impl;

import edu.yu.cs.com1320.project.stage5.Document;
import edu.yu.cs.com1320.project.stage5.DocumentStore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DocumentStoreImpl5Test {
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

    @Test
    void getDocFromDisk() throws IOException {
        this.store = new DocumentStoreImpl();
        this.setStoreWithTextAdded();
        this.store.setMaxDocumentCount(3);
        assertEquals(this.store.getDocument(this.uri1), new DocumentImpl(this.uri1,this.txt1,null));
        assertEquals(this.store.search("DOC2").get(0), new DocumentImpl(this.uri2,this.txt2,null));
        this.store.deleteDocument(this.uri3);
        this.store.undo();
        assertEquals(this.store.search("doc3").get(0), new DocumentImpl(this.uri3, this.txt3,null));
        this.store.deleteDocument(this.uri4);
        assertTrue(this.store.search("doc4").isEmpty());
        this.store.undo();
        this.store.putDocument(new ByteArrayInputStream("this ".getBytes()),this.uri4, DocumentStore.DocumentFormat.BINARY);
        this.store.undo();
        this.store.deleteDocument(this.uri4);
    }
    @Test
    void putDocument() {
    }

    @Test
    void getDocument() {
    }

    @Test
    void deleteDocument() {
    }

    @Test
    void search() {
    }

    @Test
    void setMaxDocumentCount() {
    }

    @Test
    void setMaxDocumentBytes() {
    }

    @Test
    void undo() {
    }

    @Test
    void testUndo() {
    }
}