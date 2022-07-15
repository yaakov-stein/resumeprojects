package edu.yu.cs.com1320.project.impl;

import edu.yu.cs.com1320.project.MinHeap;

public class MinHeapImpl<E extends Comparable<E>> extends MinHeap<E> {
    public MinHeapImpl(){
        this.elements = (E[]) new Comparable[10];
    }
    @Override
    public void reHeapify(E element) {
        if(element == null) throw new IllegalArgumentException("Element passed is null");
        int currentArrayIndex = this.getArrayIndex(element);
        this.swap(currentArrayIndex, this.count--);
        this.downHeap(currentArrayIndex);
        this.upHeap(++this.count);//not sure if this is ever used
    }

    @Override
    protected int getArrayIndex(E element) {
        int i;
        for(i = 1;i < this.count && elements[i] != null && !this.elements[i].equals(element);i++){}
        if (elements[i] == null || !this.elements[i].equals(element)) throw new IllegalArgumentException("Element does not exist in heap.");
        return i;
    }

    @Override
    protected void doubleArraySize() {
        E[] newArray = (E[]) new Comparable[2 * this.count];
        if (this.count >= 0) System.arraycopy(this.elements, 0, newArray, 0, this.count + 1);
        this.elements = newArray;
    }
}