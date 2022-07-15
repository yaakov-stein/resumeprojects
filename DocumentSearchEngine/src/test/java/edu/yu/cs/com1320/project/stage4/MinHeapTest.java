package edu.yu.cs.com1320.project.stage4;

import edu.yu.cs.com1320.project.impl.MinHeapImpl;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MinHeapTest {
    private MinHeapImpl<IntObject> intObjectMinHeap;
    class IntObject implements Comparable<IntObject> {
        private int integerContained;
        public IntObject(Integer a){
            this.integerContained = a;
        }
        @Override
        public int compareTo(IntObject o) {
            return this.integerContained - o.integerContained;
        }
        protected void setIntegerContained(Integer a){
            this.integerContained = a;
        }
    }
    @Test
    void reHeapify(){
        this.intObjectMinHeap = new MinHeapImpl<>();
        IntObject a = new IntObject(1);
        IntObject b = new IntObject(2);
        IntObject c = new IntObject(3);
        IntObject d = new IntObject(4);
        IntObject e = new IntObject(5);
        this.intObjectMinHeap.insert(c);
        this.intObjectMinHeap.insert(a);
        this.intObjectMinHeap.insert(e);
        this.intObjectMinHeap.insert(b);
        this.intObjectMinHeap.insert(d);
        a.setIntegerContained(4);
        this.intObjectMinHeap.reHeapify(a);
        b.setIntegerContained(5);
        this.intObjectMinHeap.reHeapify(b);
        c.setIntegerContained(1);
        this.intObjectMinHeap.reHeapify(c);
        d.setIntegerContained(2);
        this.intObjectMinHeap.reHeapify(d);
        e.setIntegerContained(3);
        this.intObjectMinHeap.reHeapify(e);
        assertEquals(c,this.intObjectMinHeap.remove());
        assertEquals(d,this.intObjectMinHeap.remove());
        assertEquals(e,this.intObjectMinHeap.remove());
        assertEquals(a,this.intObjectMinHeap.remove());
        assertEquals(b,this.intObjectMinHeap.remove());
        this.intObjectMinHeap.insert(c);
        this.intObjectMinHeap.insert(a);
        this.intObjectMinHeap.insert(e);
        this.intObjectMinHeap.insert(b);
        this.intObjectMinHeap.insert(d);
        assertEquals(c,this.intObjectMinHeap.remove());
        d.setIntegerContained(6);
        this.intObjectMinHeap.reHeapify(d);
        assertEquals(e,this.intObjectMinHeap.remove());
        d.setIntegerContained(1);
        this.intObjectMinHeap.reHeapify(d);
        assertEquals(d,this.intObjectMinHeap.remove());
    }
}