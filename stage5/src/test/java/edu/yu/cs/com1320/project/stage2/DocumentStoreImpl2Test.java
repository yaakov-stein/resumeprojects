package edu.yu.cs.com1320.project.stage2;

import edu.yu.cs.com1320.project.stage5.Document;
import edu.yu.cs.com1320.project.stage5.DocumentStore;
import edu.yu.cs.com1320.project.stage5.impl.DocumentStoreImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class DocumentStoreImpl2Test {
    DocumentStoreImpl documentStore;
    //variables to hold possible values for doc1
    private URI uri1;
    private String txt1;

    //variables to hold possible values for doc2
    private URI uri2;
    private String txt2;

    //variables to hold possible values for doc2
    private URI uri3;
    private String txt3;

    //variables to hold possible values for doc2
    private URI uri4;
    private String txt4;

    private DocumentStoreImpl createStoreAndPutOne() throws IOException {
        DocumentStoreImpl dsi = new DocumentStoreImpl();
        ByteArrayInputStream bas1 = new ByteArrayInputStream(this.txt1.getBytes());
        dsi.putDocument(bas1,this.uri1, DocumentStore.DocumentFormat.TXT);
        return dsi;
    }

    private DocumentStoreImpl createStoreAndPutAll() throws IOException {
        DocumentStoreImpl dsi = new DocumentStoreImpl();
        //doc1
        ByteArrayInputStream bas = new ByteArrayInputStream(this.txt1.getBytes());
        dsi.putDocument(bas,this.uri1, DocumentStore.DocumentFormat.TXT);
        //doc2
        bas = new ByteArrayInputStream(this.txt2.getBytes());
        dsi.putDocument(bas,this.uri2, DocumentStore.DocumentFormat.TXT);
        //doc3
        bas = new ByteArrayInputStream(this.txt3.getBytes());
        dsi.putDocument(bas,this.uri3, DocumentStore.DocumentFormat.TXT);
        //doc4
        bas = new ByteArrayInputStream(this.txt4.getBytes());
        dsi.putDocument(bas,this.uri4, DocumentStore.DocumentFormat.TXT);
        return dsi;
    }
    @BeforeEach
    void setUp() throws IOException, URISyntaxException {
        this.documentStore = new DocumentStoreImpl();
        this.documentStore.putDocument(new ByteArrayInputStream((("Hello helLO HELlo ay ay ay ay")).getBytes()),URI.create("/com.hello"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("hEllo, this-is isn't the new he you ay")).getBytes()),URI.create("/com.A"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("HEllo-- sir, how are you doing today?? ay ay")).getBytes()),URI.create("/com.imageB"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("hey, &did-your hen talk hebrew ay ay hep ay ay ay")).getBytes()),URI.create("/com.C"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("HIIIII cs&woOrlD")).getBytes()),URI.create("/com.imageD"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("     cs world  ay ay ay is amazinG:O()No?")).getBytes()),URI.create("/com.E"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream(((" HI *)hI, (is) HIm*( hit )hi(")).getBytes()),URI.create("/com.imageF"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream(new byte[10]),URI.create("/com.binary"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("HHHHHHHH")).getBytes()),URI.create("/com.imageH"), DocumentStore.DocumentFormat.BINARY);
        //init possible values for doc1
        this.uri1 = new URI("http://edu.yu.cs/com1320/project/doc1");
        this.txt1 = "This is the text of doc1, in plain text. No fancy file format - just plain old String";

        //init possible values for doc2
        this.uri2 = new URI("http://edu.yu.cs/com1320/project/doc2");
        this.txt2 = "Text for doc2. A plain old String.";

        //init possible values for doc1
        this.uri3 = new URI("http://edu.yu.cs/com1320/project/doc3");
        this.txt3 = "This is the text of doc3 - doc doc goose";

        //init possible values for doc2
        this.uri4 = new URI("http://edu.yu.cs/com1320/project/doc4");
        this.txt4 = "doc4: how much wood would a woodchuck chuck...";
    }
    @Test
    void undoURIComplex(){
        List<Document> docList1 = this.documentStore.searchByPrefix("H");
        assertEquals(5,docList1.size());
        assertEquals(2,this.documentStore.deleteAll("YOU").size());
        this.documentStore.deleteDocument(URI.create("/com.imageD"));
        assertEquals(2,this.documentStore.deleteAllWithPrefix("is").size());
        this.documentStore.deleteDocument(URI.create("/com.C"));
        assertEquals(1,this.documentStore.searchByPrefix("h").size());
        this.documentStore.undo(URI.create("/com.imageB"));
        assertEquals(2,this.documentStore.searchByPrefix("h").size());
        assertNull(this.documentStore.getDocument(URI.create("/com.A")));
        assertNull(this.documentStore.getDocument(URI.create("/com.C")));
        assertNull(this.documentStore.getDocument(URI.create("/com.imageF")));
        this.documentStore.undo(URI.create("/com.binary"));
        assertThrows(IllegalStateException.class, () -> this.documentStore.undo(URI.create("/com.binary")));
        this.documentStore.undo(URI.create("/com.A"));
        assertEquals(3,this.documentStore.searchByPrefix("h").size());
        assertNull(this.documentStore.getDocument(URI.create("/com.C")));
        this.documentStore.undo();
        assertNotNull(this.documentStore.getDocument(URI.create("/com.C")));
        assertNull(this.documentStore.getDocument(URI.create("/com.E")));
        assertNull(this.documentStore.getDocument(URI.create("/com.imageF")));
        this.documentStore.undo();
        assertNotNull(this.documentStore.getDocument(URI.create("/com.E")));
        assertNotNull(this.documentStore.getDocument(URI.create("/com.imageF")));
        assertEquals(5,this.documentStore.searchByPrefix("H").size());
        assertNull(this.documentStore.getDocument(URI.create("/com.imageD")));
        this.documentStore.undo();
        assertNotNull(this.documentStore.getDocument(URI.create("/com.imageD")));
        assertNotNull(this.documentStore.getDocument(URI.create("/com.imageH")));
        this.documentStore.undo();
        assertNull(this.documentStore.getDocument(URI.create("/com.imageH")));
    }
    @Test
    void undo() throws IOException {
        this.documentStore = this.createStoreAndPutOne();
        this.documentStore.undo();
        assertNull(this.documentStore.getDocument(this.uri1));
        this.documentStore.putDocument(new ByteArrayInputStream(this.txt2.getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);
        this.documentStore.deleteAll("DOC2");
        assertNull(this.documentStore.getDocument(this.uri2));
        this.documentStore.undo();
        List<Document> docList1 = this.documentStore.search("old");
        assertEquals(this.documentStore.getDocument(this.uri2),docList1.get(0));
        List<Document> docList2 = this.documentStore.search("DOC2");
        assertEquals(this.documentStore.getDocument(this.uri2),docList2.get(0));
        this.documentStore.undo();
        assertThrows(IllegalStateException.class, () -> this.documentStore.undo());
        this.documentStore.putDocument(new ByteArrayInputStream(this.txt2.getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);
        assertEquals(1,this.documentStore.deleteAllWithPrefix("for").size());
        assertNull(this.documentStore.getDocument(this.uri2));
        this.documentStore.undo();
        assertEquals(this.txt2, this.documentStore.getDocument(this.uri2).getDocumentTxt());
        this.documentStore.undo();
        assertThrows(IllegalStateException.class, () -> this.documentStore.undo());
        this.documentStore.putDocument(new ByteArrayInputStream(this.txt2.getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream(this.txt1.getBytes()),this.uri2, DocumentStore.DocumentFormat.TXT);
        assertEquals(this.txt1,this.documentStore.getDocument(this.uri2).getDocumentTxt());
        this.documentStore.undo();
        assertEquals(this.txt2,this.documentStore.getDocument(this.uri2).getDocumentTxt());
        this.documentStore.undo();
        assertNull(this.documentStore.getDocument(this.uri2));
    }
    @Test
    void undoURI() throws IOException {
        this.documentStore = this.createStoreAndPutAll();
        List<Document> docList1 = this.documentStore.searchByPrefix("doc");
        assertEquals(4,docList1.size());
        assertEquals(3,this.documentStore.deleteAll("text").size());
        List<Document> docList2 = this.documentStore.searchByPrefix("doc");
        assertEquals(1,docList2.size());
        assertEquals(this.documentStore.getDocument(this.uri4),docList2.get(0));
        assertNull(this.documentStore.getDocument(this.uri2));
        this.documentStore.undo(this.uri2);
        List<Document> docList3 = this.documentStore.searchByPrefix("doc");
        assertEquals(2,docList3.size());
        assertNotNull(this.documentStore.getDocument(this.uri2));
        this.documentStore.undo();
        List<Document> docList4 = this.documentStore.searchByPrefix("doc");
        assertEquals(4,docList4.size());
        this.documentStore = this.createStoreAndPutAll();
        this.documentStore.deleteAllWithPrefix("THE");
        assertEquals(2,this.documentStore.searchByPrefix("dOC").size());
        this.documentStore.undo(this.uri1);
        this.documentStore.undo(this.uri3);
        this.documentStore.undo();
        assertEquals(3,this.documentStore.searchByPrefix("doc").size());
        assertNull(this.documentStore.getDocument(this.uri4));
    }
    @Test
    void search(){
        List<Document> documentList1 = this.documentStore.search("HeLLO");
        assertEquals(3,documentList1.size());
        assertEquals(this.documentStore.getDocument(URI.create("/com.hello")),documentList1.get(0));
        this.documentStore.deleteDocument(URI.create("/com.hello"));
        assertEquals(2,this.documentStore.search("hellO").size());
        this.documentStore.undo();
        List<Document> documentList2 = this.documentStore.search("HI");
        assertEquals(1,documentList2.size());
        assertEquals(this.documentStore.getDocument(URI.create("/com.imageF")),documentList2.get(0));
        this.documentStore.deleteDocument(URI.create("/com.imageF"));
        assertEquals(new ArrayList<>(), this.documentStore.search("hI"));
        assertEquals(this.documentStore.getDocument(URI.create("/com.E")),this.documentStore.search("AMAZINGONO").get(0));
        List<Document> documentList3 = this.documentStore.search("AY");
        assertEquals(5,documentList3.size());
        assertEquals(this.documentStore.getDocument(URI.create("/com.C")),documentList3.get(0));
        assertEquals(this.documentStore.getDocument(URI.create("/com.hello")),documentList3.get(1));
        assertEquals(this.documentStore.getDocument(URI.create("/com.E")),documentList3.get(2));
        assertEquals(this.documentStore.getDocument(URI.create("/com.imageB")),documentList3.get(3));
        assertEquals(this.documentStore.getDocument(URI.create("/com.A")),documentList3.get(4));
        assertEquals(new ArrayList<>(), this.documentStore.search(null));
    }
    @Test
    void searchByPrefix(){
        List<Document> documentList1 = this.documentStore.searchByPrefix("HE");
        assertEquals(4,documentList1.size());
        assertEquals(this.documentStore.getDocument(URI.create("/com.C")),documentList1.get(0));
        assertEquals(this.documentStore.getDocument(URI.create("/com.hello")),documentList1.get(1));
        assertEquals(this.documentStore.getDocument(URI.create("/com.A")),documentList1.get(2));
        assertEquals(this.documentStore.getDocument(URI.create("/com.imageB")),documentList1.get(3));
        this.documentStore.deleteDocument(URI.create("/com.C"));
        List<Document> documentList2 = this.documentStore.searchByPrefix("HE");
        assertEquals(3,documentList2.size());
        assertEquals(this.documentStore.getDocument(URI.create("/com.hello")),documentList2.get(0));
        assertEquals(this.documentStore.getDocument(URI.create("/com.A")),documentList2.get(1));
        assertEquals(this.documentStore.getDocument(URI.create("/com.imageB")),documentList2.get(2));
        List<Document> documentList3 = this.documentStore.searchByPrefix("Hi");
        assertEquals(1,documentList3.size());
        assertEquals(new ArrayList<>(), this.documentStore.searchByPrefix(null));
        assertEquals(0,this.documentStore.searchByPrefix("csw").size());
    }
    @Test
    void deleteAll(){
        List<Document> docList1 = this.documentStore.search("AY");
        assertEquals(5,docList1.size());
        Set<URI> uriSet1 = this.documentStore.deleteAll("ay");
        assertEquals(5,uriSet1.size());
        for(URI a:uriSet1){
            assertNull(this.documentStore.getDocument(a));
        }
        this.documentStore.undo();
        assertEquals(5,this.documentStore.search("AY").size());
        assertEquals(2,this.documentStore.deleteAll("YOU").size());
        assertEquals(3,this.documentStore.search("AY").size());
        assertEquals(new HashSet<>(),this.documentStore.deleteAll(null));
    }
    @Test
    void deleteAllWithPrefix(){
        List<Document> documentList1 = this.documentStore.searchByPrefix("hE");
        assertEquals(4,documentList1.size());
        Set<URI> uriSet1 = this.documentStore.deleteAllWithPrefix("hE");
        assertEquals(4,uriSet1.size());
        for(URI a:uriSet1){
            assertNull(this.documentStore.getDocument(a));
        }
        assertEquals(0,this.documentStore.deleteAllWithPrefix("he").size());
        assertEquals(0,this.documentStore.searchByPrefix("he").size());
        assertEquals(new HashSet<>(), this.documentStore.deleteAllWithPrefix(null));
        assertEquals(1,this.documentStore.deleteAllWithPrefix("ay").size());
    }
}
