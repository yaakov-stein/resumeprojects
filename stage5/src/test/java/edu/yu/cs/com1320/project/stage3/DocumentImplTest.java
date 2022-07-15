package edu.yu.cs.com1320.project.stage3;

import edu.yu.cs.com1320.project.Utils;
import edu.yu.cs.com1320.project.stage5.impl.DocumentImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.net.URI;

public class DocumentImplTest {
    private URI textUri;
    private String textString;

    private URI binaryUri;
    private byte[] binaryData;

    @BeforeEach
    public void setUp() throws Exception {
        this.textUri = new URI("http://edu.yu.cs/com1320/txt");
        this.textString = "This is text content. Lots of it.";

        this.binaryUri = new URI("http://edu.yu.cs/com1320/binary");
        this.binaryData = "This is a PDF, brought to you by Adobe.".getBytes();

    }

    @Test
    public void stage3WordCount() {
        DocumentImpl textDocument = new DocumentImpl(this.textUri, this.textString, null);
        assertEquals(1, textDocument.wordCount("This"));
        assertEquals(0, textDocument.wordCount("blah"));
    }

    @Test
    public void stage3CaseInsensitiveWordCount() {
        DocumentImpl textDocument = new DocumentImpl(this.textUri, this.textString, null);
        assertEquals(1, textDocument.wordCount("this"));
        assertEquals(1, textDocument.wordCount("tHis"));
    }

    //stage 1 tests
    @Test
    public void testGetTextDocumentAsTxt() {
        DocumentImpl textDocument = new DocumentImpl(this.textUri, this.textString, null);
        assertEquals(this.textString, textDocument.getDocumentTxt());
    }

    @Test
    public void testGetDocumentBinaryData() {
        DocumentImpl binaryDocument = new DocumentImpl(this.binaryUri, this.binaryData);
        assertArrayEquals(this.binaryData,binaryDocument.getDocumentBinaryData());
    }

    @Test
    public void testGetTextDocumentTextHashCode() {
        DocumentImpl textDocument = new DocumentImpl(this.textUri, this.textString, null);
        int code = Utils.calculateHashCode(this.textUri, this.textString,null);
        assertEquals(code, textDocument.hashCode());
    }

    @Test
    public void testGetBinaryDocumentTextHashCode() {
        DocumentImpl binaryDocument = new DocumentImpl(this.binaryUri, this.binaryData);
        int code = Utils.calculateHashCode(this.binaryUri, null, this.binaryData);
        assertEquals(code, binaryDocument.hashCode());
    }

    @Test
    public void testGetTextDocumentKey() {
        DocumentImpl textDocument = new DocumentImpl(this.textUri, this.textString, null);
        assertEquals(this.textUri, textDocument.getKey());
    }

    @Test
    public void testGetBinaryDocumentKey() {
        DocumentImpl binaryDocument = new DocumentImpl(this.binaryUri, this.binaryData);
        assertEquals(this.binaryUri, binaryDocument.getKey());
    }
}