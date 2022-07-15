package edu.yu.cs.com1320.project.stage3;

import edu.yu.cs.com1320.project.stage5.impl.DocumentImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.net.URI;
import java.util.HashSet;
import java.util.Set;

class DocumentImpl2Test {
    DocumentImpl newDocument1;
    DocumentImpl newDocument2;
    DocumentImpl newDocument3;
    DocumentImpl newDocument4;
    DocumentImpl newDocument5;
    DocumentImpl newDocument6;
    DocumentImpl newDocument7;

    @BeforeEach
    void setUp() {
        this.newDocument1 = new DocumentImpl(URI.create("/com.a"), "hEllo, this-is isn't the new he", null);
        this.newDocument2 = new DocumentImpl(URI.create("/com.b"), "999HEllo-- sir09, h6ow8 are you doing today?? 9", null);
        this.newDocument3 = new DocumentImpl(URI.create("/com.c"), "hey, &did-your hen talk hebrew", null);
        this.newDocument4 = new DocumentImpl(URI.create("/com.d"), "HIII9I9I cs&wo0OrlD 000", null);;
        this.newDocument5 = new DocumentImpl(URI.create("/com.e"),"cs world is amazinG:O()No?", null);
        this.newDocument6 = new DocumentImpl(URI.create("/com.f"), " HI *)hI, HIm*( hit )hi(", null);
        this.newDocument7 = new DocumentImpl(URI.create("/com.binary"), new byte[10]);
    }
    @Test
    void setUpSuccess(){
        assertEquals(this.newDocument1.getDocumentTxt(),"hEllo, this-is isn't the new he");
        assertEquals(this.newDocument5.getDocumentTxt(),"cs world is amazinG:O()No?");
        assertEquals(this.newDocument6.getDocumentTxt()," HI *)hI, HIm*( hit )hi(");
    }
    @Test
    void wordCount(){
        assertEquals(0,this.newDocument1.wordCount("is"));
        assertEquals(1,this.newDocument1.wordCount("hE"));
        assertEquals(0,this.newDocument7.wordCount("I"));
        assertEquals(3,this.newDocument6.wordCount("HI"));
        assertEquals(1,this.newDocument2.wordCount("999HELLO"));
        assertEquals(1,this.newDocument2.wordCount("h6OW8"));
        assertEquals(1,this.newDocument4.wordCount("hiii9I9I"));
        assertEquals(1,this.newDocument4.wordCount("000"));
        assertEquals(1,this.newDocument6.wordCount("HIm"));
        assertEquals(1,this.newDocument3.wordCount("DIDYOUR"));
        assertThrows(IllegalArgumentException.class,() -> this.newDocument1.wordCount(null));
        assertThrows(IllegalArgumentException.class,() -> this.newDocument7.wordCount(null));
        assertEquals(this.newDocument1.getDocumentTxt(),"hEllo, this-is isn't the new he");
        assertEquals(this.newDocument5.getDocumentTxt(),"cs world is amazinG:O()No?");
        assertEquals(this.newDocument6.getDocumentTxt()," HI *)hI, HIm*( hit )hi(");
    }
    @Test
    void getWords(){
        Set<String> expectedDoc1Strings = new HashSet<>();
        expectedDoc1Strings.add("hello");
        expectedDoc1Strings.add("THISIS".toLowerCase());
        expectedDoc1Strings.add("ISNT".toLowerCase());
        expectedDoc1Strings.add("THE".toLowerCase());
        expectedDoc1Strings.add("NEW".toLowerCase());
        expectedDoc1Strings.add("HE".toLowerCase());
        Set<String> document1Strings = this.newDocument1.getWords();
        assertTrue(document1Strings.containsAll(expectedDoc1Strings));
        assertTrue(expectedDoc1Strings.containsAll(document1Strings));
        Set<String> expectedDoc6Strings = new HashSet<>();
        expectedDoc6Strings.add("hi");
        expectedDoc6Strings.add("him");
        expectedDoc6Strings.add("hit");
        Set<String> document6Strings = this.newDocument6.getWords();
        assertTrue(document6Strings.containsAll(expectedDoc6Strings));
        assertTrue(expectedDoc6Strings.containsAll(document6Strings));
        assertEquals(new HashSet<>(), this.newDocument7.getWords());
        assertEquals(this.newDocument1.getDocumentTxt(),"hEllo, this-is isn't the new he");
        assertEquals(this.newDocument5.getDocumentTxt(),"cs world is amazinG:O()No?");
        assertEquals(this.newDocument6.getDocumentTxt()," HI *)hI, HIm*( hit )hi(");
        assertEquals(3,this.newDocument4.getWords().size());
        assertEquals(8, this.newDocument2.getWords().size());
    }
}
