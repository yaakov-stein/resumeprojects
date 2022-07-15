package edu.yu.cs.com1320.project.stage2;

import edu.yu.cs.com1320.project.GenericCommand;
import edu.yu.cs.com1320.project.impl.StackImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.net.URI;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class StackImpl1Test {
    
    private StackImpl<String> stringStack;
    @BeforeEach
    public void initStringTable() {
        this.stringStack = new StackImpl<>();
        this.stringStack.push("Value1");
        this.stringStack.push("Value2");
        this.stringStack.push("Value3");
        this.stringStack.push("Value4");
        this.stringStack.push("Value5");
        this.stringStack.push("Value6");
    }
    @Test
    void testPushBasic() {
        assertEquals("Value6",this.stringStack.peek());
        this.stringStack.push("Value7");
        this.stringStack.push("Value8");
        assertEquals("Value8",this.stringStack.peek());
    }

    @Test
    void testPop() {
        assertEquals(6,this.stringStack.size());
        assertEquals("Value6", this.stringStack.pop());
        assertEquals("Value5",this.stringStack.pop());
        assertEquals("Value4", this.stringStack.pop());
        assertEquals("Value3",this.stringStack.pop());
        assertEquals("Value2", this.stringStack.pop());
        assertEquals("Value1",this.stringStack.pop());
        assertNull(this.stringStack.pop());
        assertEquals(0,this.stringStack.size());
        this.stringStack.push("ValueNew");
        assertEquals(1,this.stringStack.size());
        assertEquals("ValueNew", this.stringStack.pop());
        assertEquals(0, this.stringStack.size());
    }

    @Test
    void testPeek() {
        assert this.stringStack.size() == 6;
        assertEquals("Value6",this.stringStack.peek());
        assertEquals(6, this.stringStack.size());
        assertEquals("Value6", this.stringStack.peek());
        assertEquals(6, this.stringStack.size());
        this.stringStack.pop();
        assertEquals(5, this.stringStack.size());
        assertEquals("Value5", this.stringStack.peek());
        assertEquals(5, this.stringStack.size());
    }

    @Test
    void repeatedValue() {
        assertEquals(6, this.stringStack.size());
        this.stringStack.push("Value1");
        this.stringStack.push("Value2");
        this.stringStack.push("Value3");
        this.stringStack.push("Value4");
        this.stringStack.push("Value5");
        this.stringStack.push("Value6");
        assertEquals(12,this.stringStack.size());
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        assertEquals(8,this.stringStack.size());
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        this.stringStack.pop();
        assertEquals(0, this.stringStack.size());
        assertNull(this.stringStack.pop());
        assertNull(this.stringStack.pop());
        assertEquals(0, this.stringStack.size());
    }
    @Test
    void commandStackTest(){
        StackImpl<GenericCommand<URI>> commandStack = new StackImpl<>();
        assertEquals(0,commandStack.size());
        commandStack.push(new GenericCommand<URI>(URI.create("/com.1"),x -> x != null));
        commandStack.push(new GenericCommand<URI>(URI.create("/com.2"),x -> x != null));
        commandStack.push(new GenericCommand<URI>(URI.create("/com.3"),x -> x != null));
        commandStack.push(new GenericCommand<URI>(URI.create("/com.4"),x -> x != null));
        commandStack.push(new GenericCommand<URI>(URI.create("/com.5"),x -> x != null));
        commandStack.push(new GenericCommand<URI>(URI.create("/com.6"),x -> x != null));
        assertEquals(6,commandStack.size());
        assertEquals(URI.create("/com.6"),commandStack.peek().getTarget());
        assertEquals(6,commandStack.size());
        assertEquals(URI.create("/com.6"),commandStack.pop().getTarget());
        assertEquals(5,commandStack.size());
        assertNotEquals(URI.create("/com.6"),commandStack.peek().getTarget());
        assertEquals(URI.create("/com.5"),commandStack.peek().getTarget());
        assertEquals(5,commandStack.size());
        commandStack.pop();
        commandStack.pop();
        commandStack.pop();
        commandStack.pop();
        assertEquals(1,commandStack.size());
        assertEquals(URI.create("/com.1"),commandStack.pop().getTarget());
        assertEquals(0,commandStack.size());
        assertNull(commandStack.peek());
        assertNull(commandStack.pop());
    }
}