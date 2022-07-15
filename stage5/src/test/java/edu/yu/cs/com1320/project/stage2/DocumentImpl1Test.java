package edu.yu.cs.com1320.project.stage2;

import edu.yu.cs.com1320.project.stage5.impl.DocumentImpl;
import org.junit.jupiter.api.Test;
import java.net.URI;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

class DocumentImpl1Test {
    DocumentImpl newDocument1;
    DocumentImpl newDocument2;
    DocumentImpl newDocument3;
    DocumentImpl newDocument4;
    DocumentImpl newDocument5;
    public DocumentImpl1Test(){
        this.newDocument1 = new DocumentImpl(URI.create("/com.hello"),"Hello", null);
        this.newDocument2 = new DocumentImpl(URI.create("/com.hello"),"Hello", null);
        this.newDocument3 = new DocumentImpl(URI.create("/com.hellosir"),"Hello",null);
        this.newDocument4 = new DocumentImpl(URI.create("/com.hello"),"Hello",null);
        byte[] bytes = new byte[10];
        this.newDocument5 = new DocumentImpl(URI.create("/com/Mam"), bytes);
    }
    @Test
    void emptyDocuments() {
        assertThrows(IllegalArgumentException.class,() -> new DocumentImpl(URI.create(""),"JOHN", null));
        assertThrows(IllegalArgumentException.class,() -> new DocumentImpl(URI.create("L"),"", null));
        assertThrows(IllegalArgumentException.class,() -> new DocumentImpl(URI.create("L"), new byte[0]));
    }
    @Test
    void getDocumentTxt() {
        assert this.newDocument3.getDocumentTxt().equals("Hello");
        assertNull(this.newDocument5.getDocumentTxt());
    }

    @Test
    void getDocumentBinaryData() {
        assert Arrays.equals(this.newDocument5.getDocumentBinaryData(), new byte[10]);
        assertNull(this.newDocument3.getDocumentBinaryData());
    }

    @Test
    void getKey() {
        assert this.newDocument3.getKey().equals(URI.create("/com.hellosir"));
    }
    @Test
    void checkEqualsAndHashCode(){
        assert this.newDocument1.equals(this.newDocument2);
        assert this.newDocument1.hashCode() == this.newDocument2.hashCode();
        assert !this.newDocument2.equals(this.newDocument3);
        assert this.newDocument2.hashCode() != this.newDocument3.hashCode();
        assert this.newDocument2.equals(this.newDocument4);
        assert this.newDocument2.hashCode() == this.newDocument4.hashCode();
    }
}