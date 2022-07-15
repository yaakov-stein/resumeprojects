package edu.yu.cs.com1320.project.stage2;

import edu.yu.cs.com1320.project.stage5.DocumentStore;
import edu.yu.cs.com1320.project.stage5.impl.DocumentStoreImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

public class DocumentStoreImpl1Test {
    private DocumentStoreImpl documentStore = new DocumentStoreImpl();

    @BeforeEach
    public void setDocuments() throws IOException {
        this.documentStore.putDocument(new ByteArrayInputStream((("Hello")).getBytes()),URI.create("/com.hello"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("AAAAAAAA")).getBytes()),URI.create("/com.A"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("BBBBBBBB")).getBytes()),URI.create("/com.imageB"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("CCCCCCCC")).getBytes()),URI.create("/com.C"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("DDDDDDDD")).getBytes()),URI.create("/com.imageD"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("EEEEEEEE")).getBytes()),URI.create("/com.E"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("FFFFFFFF")).getBytes()),URI.create("/com.imageF"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("GGGGGGGG")).getBytes()),URI.create("/com.G"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("HHHHHHHH")).getBytes()),URI.create("/com.imageH"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("IIIIIIII")).getBytes()),URI.create("/com.I"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("JJJJJJJJ")).getBytes()),URI.create("/com.imageJ"), DocumentStore.DocumentFormat.BINARY);
    }
    @Test
    void testUndoBasic() throws URISyntaxException {
        assertEquals(new URI("/com.imageJ"),this.documentStore.getDocument(new URI("/com.imageJ")).getKey());
        this.documentStore.undo();
        assertNull(this.documentStore.getDocument(new URI("/com.imageJ")));
        assertNotNull(this.documentStore.getDocument(new URI("/com.I")));
        assertNotNull(this.documentStore.getDocument(new URI("/com.imageH")));
        assertNotNull(this.documentStore.getDocument(new URI("/com.G")));
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        assertNull(this.documentStore.getDocument(new URI("/com.I")));
        assertNull(this.documentStore.getDocument(new URI("/com.imageH")));
        assertNull(this.documentStore.getDocument(new URI("/com.G")));
    }
    @Test
    void testUndoThrowsException() throws IOException {
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        try {
            this.documentStore.undo();
            fail("Undo should have thrown an exception as there is nothing left on the stack");
        }catch(IllegalStateException e){}
        this.documentStore.putDocument(new ByteArrayInputStream((("JJJJJJJJ")).getBytes()),URI.create("/com.imageJ"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.undo();
    }
    @Test
    void testUndoURIBasic() throws URISyntaxException {
        //check that E.com exists, then undo that action and make sure it no longer exists
        assertEquals(this.documentStore.getDocument(new URI("/com.E")).getKey(),new URI("/com.E"));
        assertNotNull(this.documentStore.getDocument(new URI("/com.E")));
        this.documentStore.undo(new URI("/com.E"));
        assertNull(this.documentStore.getDocument(new URI("/com.E")));
        //ensure nothing else has occurred to the Document Store
        assertEquals(this.documentStore.getDocument(new URI("/com.I")).getKey(),new URI("/com.I"));
        assertEquals(this.documentStore.getDocument(new URI("/com.imageH")).getKey(),new URI("/com.imageH"));
        assertEquals(this.documentStore.getDocument(new URI("/com.imageF")).getKey(),new URI("/com.imageF"));
        //Check that given keys exist, then remove and check that they were properly removed
        assertNotNull(this.documentStore.getDocument(new URI("/com.hello")));
        assertNotNull(this.documentStore.getDocument(new URI("/com.C")));
        assertNotNull(this.documentStore.getDocument(new URI("/com.imageJ")));
        this.documentStore.undo(new URI("/com.hello"));
        this.documentStore.undo(new URI("/com.C"));
        this.documentStore.undo(new URI("/com.imageJ"));
        assertNull(this.documentStore.getDocument(new URI("/com.hello")));
        assertNull(this.documentStore.getDocument(new URI("/com.C")));
        assertNull(this.documentStore.getDocument(new URI("/com.imageJ")));
        //ensure nothing else has occurred to the Document Store
        assertEquals(this.documentStore.getDocument(new URI("/com.A")).getKey(),new URI("/com.A"));
        assertEquals(this.documentStore.getDocument(new URI("/com.imageD")).getKey(),new URI("/com.imageD"));
        assertEquals(this.documentStore.getDocument(new URI("/com.I")).getKey(),new URI("/com.I"));
    }
    @Test
    void testUndoURIThrowsException() throws IOException, URISyntaxException {
        try {
            this.documentStore.undo(new URI("AAA"));
            fail("Undo(URI) should have thrown an exception as this URI does not exist on the stack");
        }catch(IllegalStateException | URISyntaxException e){}
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        try {
            this.documentStore.undo(new URI("/com.imageH"));
            fail("Undo(URI) should have thrown an exception as this URI was removed from the stack");
        }catch(IllegalStateException | URISyntaxException e){}
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        this.documentStore.undo();
        try {
            this.documentStore.undo(new URI("/com.hello"));
            fail("Undo(URI) should have thrown an exception as there is nothing left on the stack");
        }catch(IllegalStateException e){}
        this.documentStore.putDocument(new ByteArrayInputStream((("JJJJJJJJ")).getBytes()),URI.create("/com.imageJ"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.undo(new URI("/com.imageJ"));
        try {
            this.documentStore.undo();
            fail("Undo should have thrown an exception as there is nothing left on the stack");
        }catch(IllegalStateException e){}
    }
    @Test
    void testUndoWithPreexistingDoc() throws IOException, URISyntaxException {
        assertEquals("CCCCCCCC",this.documentStore.getDocument(URI.create("/com.C")).getDocumentTxt());
        this.documentStore.putDocument(new ByteArrayInputStream((("INPUT2")).getBytes()),URI.create("/com.C"), DocumentStore.DocumentFormat.TXT);
        assertEquals("INPUT2",this.documentStore.getDocument(URI.create("/com.C")).getDocumentTxt());
        this.documentStore.undo();
        assertEquals("CCCCCCCC",this.documentStore.getDocument(URI.create("/com.C")).getDocumentTxt());
        //check that this undo does not go back into the stack and the next undo will undo the previous action
        assertArrayEquals("JJJJJJJJ".getBytes(),this.documentStore.getDocument(new URI("/com.imageJ")).getDocumentBinaryData());
        this.documentStore.undo();
        assertNull(this.documentStore.getDocument(new URI("/com.imageJ")));
        assertArrayEquals("FFFFFFFF".getBytes(),this.documentStore.getDocument(new URI("/com.imageF")).getDocumentBinaryData());
        this.documentStore.putDocument(null,URI.create("/com.imageF"), DocumentStore.DocumentFormat.BINARY);
        assertNull(this.documentStore.getDocument(new URI("/com.imageF")));
        this.documentStore.undo();
        assertArrayEquals("FFFFFFFF".getBytes(),this.documentStore.getDocument(new URI("/com.imageF")).getDocumentBinaryData());
        assertNotNull(this.documentStore.getDocument(new URI("/com.imageF")));
        assertArrayEquals("HHHHHHHH".getBytes(),this.documentStore.getDocument(new URI("/com.imageH")).getDocumentBinaryData());
        assertNull(this.documentStore.getDocument(new URI("/com.imageH")).getDocumentTxt());
        this.documentStore.putDocument(new ByteArrayInputStream((("NEWTXTDOC")).getBytes()),URI.create("/com.imageH"), DocumentStore.DocumentFormat.TXT);
        assertNull(this.documentStore.getDocument(new URI("/com.imageH")).getDocumentBinaryData());
        assertEquals("NEWTXTDOC",this.documentStore.getDocument(new URI("/com.imageH")).getDocumentTxt());
        this.documentStore.undo();
        assertArrayEquals("HHHHHHHH".getBytes(),this.documentStore.getDocument(new URI("/com.imageH")).getDocumentBinaryData());
        assertNull(this.documentStore.getDocument(new URI("/com.imageH")).getDocumentTxt());
    }
    @Test
    void testUndoDelete() throws URISyntaxException {
        assertNotNull(this.documentStore.getDocument(new URI("/com.G")));
        this.documentStore.deleteDocument(new URI("/com.G"));
        assertNull(this.documentStore.getDocument(new URI("/com.G")));
        this.documentStore.undo();
        assertNotNull(this.documentStore.getDocument(new URI("/com.G")));
    }
    @Test
    void testUndoURIComplex() throws IOException, URISyntaxException {
        //Remove the previous three actions done by a given URI
        assertArrayEquals("BBBBBBBB".getBytes(),this.documentStore.getDocument(new URI("/com.imageB")).getDocumentBinaryData());
        this.documentStore.putDocument(new ByteArrayInputStream((("INPUTNEW")).getBytes()),URI.create("/com.imageB"), DocumentStore.DocumentFormat.TXT);
        assertNull(this.documentStore.getDocument(new URI("/com.imageB")).getDocumentBinaryData());
        assertEquals("INPUTNEW",this.documentStore.getDocument(new URI("/com.imageB")).getDocumentTxt());
        this.documentStore.putDocument(new ByteArrayInputStream((("DUNDOCOMPLEX")).getBytes()),URI.create("/com.imageD"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("EUNDOCOMPLEX")).getBytes()),URI.create("/com.E"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("FUNDOCOMPLEX")).getBytes()),URI.create("/com.imageF"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("GUNDOCOMPLEX")).getBytes()),URI.create("/com.G"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.deleteDocument(new URI("/com.imageB"));
        assertNull(this.documentStore.getDocument(new URI("/com.imageB")));
        this.documentStore.putDocument(new ByteArrayInputStream((("DUNDOCOMPLEX2")).getBytes()),URI.create("/com.imageD"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("EUNDOCOMPLEX2")).getBytes()),URI.create("/com.E"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("FUNDOCOMPLEX2")).getBytes()),URI.create("/com.imageF"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("GUNDOCOMPLEX2")).getBytes()),URI.create("/com.G"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("FINALINPUT")).getBytes()),URI.create("/com.imageB"), DocumentStore.DocumentFormat.TXT);
        assertEquals("FINALINPUT",this.documentStore.getDocument(URI.create("/com.imageB")).getDocumentTxt());
        this.documentStore.putDocument(new ByteArrayInputStream((("DUNDOCOMPLEX3")).getBytes()),URI.create("/com.imageD"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("EUNDOCOMPLEX3")).getBytes()),URI.create("/com.E"), DocumentStore.DocumentFormat.TXT);
        this.documentStore.putDocument(new ByteArrayInputStream((("FUNDOCOMPLEX3")).getBytes()),URI.create("/com.imageF"), DocumentStore.DocumentFormat.BINARY);
        this.documentStore.putDocument(new ByteArrayInputStream((("GUNDOCOMPLEX3")).getBytes()),URI.create("/com.G"), DocumentStore.DocumentFormat.TXT);
        assertEquals("FINALINPUT",this.documentStore.getDocument(URI.create("/com.imageB")).getDocumentTxt());
        this.documentStore.undo(URI.create("/com.imageB"));
        assertNull(this.documentStore.getDocument(URI.create("/com.imageB")));
        assertArrayEquals("FUNDOCOMPLEX3".getBytes(),this.documentStore.getDocument(URI.create("/com.imageF")).getDocumentBinaryData());
        assertEquals("GUNDOCOMPLEX3",this.documentStore.getDocument(URI.create("/com.G")).getDocumentTxt());
        this.documentStore.undo(URI.create("/com.imageB"));
        assertEquals("INPUTNEW",this.documentStore.getDocument(new URI("/com.imageB")).getDocumentTxt());
        assertArrayEquals("FUNDOCOMPLEX3".getBytes(),this.documentStore.getDocument(URI.create("/com.imageF")).getDocumentBinaryData());
        assertEquals("GUNDOCOMPLEX3",this.documentStore.getDocument(URI.create("/com.G")).getDocumentTxt());
        this.documentStore.undo(URI.create("/com.imageB"));
        assertArrayEquals("BBBBBBBB".getBytes(),this.documentStore.getDocument(new URI("/com.imageB")).getDocumentBinaryData());
        assertArrayEquals("FUNDOCOMPLEX3".getBytes(),this.documentStore.getDocument(URI.create("/com.imageF")).getDocumentBinaryData());
        assertEquals("GUNDOCOMPLEX3",this.documentStore.getDocument(URI.create("/com.G")).getDocumentTxt());
        assertEquals(this.documentStore.getDocument(new URI("/com.A")).getKey(),new URI("/com.A"));
        assertEquals(this.documentStore.getDocument(new URI("/com.imageD")).getKey(),new URI("/com.imageD"));
        assertEquals(this.documentStore.getDocument(new URI("/com.I")).getKey(),new URI("/com.I"));
        //test with preexisting docs
    }
    @Test
    public void getDocument() throws IOException {
        assert this.documentStore.getDocument(URI.create("/com.imageB")) != null;
        assert Arrays.equals(this.documentStore.getDocument(URI.create("/com.imageB")).getDocumentBinaryData(), (("BBBBBBBB")).getBytes());
        assert this.documentStore.getDocument(URI.create("/com.imageB")).getKey().equals(URI.create("/com.imageB"));
        assert this.documentStore.getDocument(URI.create("/com.imageB")).getDocumentTxt() == null;
        assert this.documentStore.deleteDocument(URI.create("/com.imageB"));
        assert this.documentStore.getDocument(URI.create("/com.imageB")) == null;
        assert this.documentStore.getDocument(URI.create("/com.I")).hashCode() == this.documentStore.putDocument(null,URI.create("/com.I"),DocumentStore.DocumentFormat.BINARY);
        assert this.documentStore.getDocument(URI.create("/com.I")) == null;
    }
    @Test
    public void deleteDocumentEmptyHashTableTest(){
        DocumentStoreImpl documentStore2 = new DocumentStoreImpl();
        assertFalse(documentStore2.deleteDocument(URI.create("/hello/")));
    }
    @Test
    public void errorThrower(){
        assertThrows(IllegalArgumentException.class,() ->{
            this.documentStore.putDocument(new ByteArrayInputStream((("AAAAAAAA")).getBytes()),null, DocumentStore.DocumentFormat.TXT);
        });
        assertThrows(IllegalArgumentException.class,() ->{
            this.documentStore.putDocument(new ByteArrayInputStream((("AAAAAAAA")).getBytes()),URI.create("/com.imageJ"), null);
        });
    }
    @Test
    void deleteDocuments() throws IOException {
        DocumentStoreImpl documentStore2 = new DocumentStoreImpl();
        assertFalse(documentStore2.deleteDocument(URI.create("/hello/")));
        documentStore2.putDocument(new ByteArrayInputStream((("AAAAAAAA")).getBytes()),URI.create("/com.A"), DocumentStore.DocumentFormat.TXT);
        documentStore2.putDocument(new ByteArrayInputStream((("BBBBBBBB")).getBytes()),URI.create("/com.imageB"), DocumentStore.DocumentFormat.BINARY);
        documentStore2.putDocument(new ByteArrayInputStream((("CCCCCCCC")).getBytes()),URI.create("/com.C"), DocumentStore.DocumentFormat.TXT);
        documentStore2.putDocument(new ByteArrayInputStream((("DDDDDDDD")).getBytes()),URI.create("/com.imageD"), DocumentStore.DocumentFormat.BINARY);
        documentStore2.putDocument(new ByteArrayInputStream((("EEEEEEEE")).getBytes()),URI.create("/com.E"), DocumentStore.DocumentFormat.TXT);
        assertTrue(documentStore2.deleteDocument(URI.create("/com.imageD")));
        assertNull(documentStore2.getDocument(URI.create("/com.imageD")));
        assertFalse(documentStore2.deleteDocument(null));
        assertFalse(documentStore2.deleteDocument(URI.create("IAMFAKE")));
    }
}
