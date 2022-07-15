package edu.yu.cs.com1320.project.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MinHeapImplTest {
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
    private MinHeapImpl<Integer> integerMinHeap;
    private MinHeapImpl<IntObject> intObjectMinHeap;
    @BeforeEach
    void setUp(){
        this.integerMinHeap = new MinHeapImpl<>();
        this.intObjectMinHeap = new MinHeapImpl<>();
    }

    @Test
    void basicIntMinHeapTest() {
        this.integerMinHeap.insert(1);
        this.integerMinHeap.insert(2);
        this.integerMinHeap.insert(3);
        this.integerMinHeap.insert(4);
        this.integerMinHeap.insert(5);
        this.integerMinHeap.insert(6);
        this.integerMinHeap.insert(7);
        this.integerMinHeap.insert(8);
        this.integerMinHeap.insert(9);
        this.integerMinHeap.insert(10);
        assertEquals(1,this.integerMinHeap.remove());
        assertEquals(2,this.integerMinHeap.remove());
        assertEquals(3,this.integerMinHeap.remove());
        assertEquals(4,this.integerMinHeap.remove());
        assertEquals(5,this.integerMinHeap.remove());
        assertEquals(6,this.integerMinHeap.remove());
        assertEquals(7,this.integerMinHeap.remove());
        assertEquals(8,this.integerMinHeap.remove());
        assertEquals(9,this.integerMinHeap.remove());
        assertEquals(10,this.integerMinHeap.remove());
    }
    @Test
    void complexIntMinHeapTest() {
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
    @Test
    void reHeapify() {
    }
    @Test
    void getArrayIndex() {
        assertThrows(IllegalArgumentException.class, () -> {
            this.integerMinHeap.getArrayIndex(1);
        });
        this.integerMinHeap.insert(1);
        assertEquals(1,this.integerMinHeap.getArrayIndex(1));
        this.integerMinHeap.insert(2);
        this.integerMinHeap.insert(3);
        this.integerMinHeap.insert(4);
        this.integerMinHeap.insert(5);
        this.integerMinHeap.insert(6);
        this.integerMinHeap.insert(7);
        this.integerMinHeap.insert(8);
        this.integerMinHeap.insert(9);
        this.integerMinHeap.insert(10);
    }
    @Test
    void doubleArraySize() {
    }
}