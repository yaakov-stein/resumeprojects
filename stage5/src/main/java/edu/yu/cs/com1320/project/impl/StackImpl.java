package edu.yu.cs.com1320.project.impl;

import edu.yu.cs.com1320.project.Stack;

public class StackImpl<T> implements Stack<T> {
    private Node<T> top;
    private int length;
    class Node<T>{
        private Node<T> next;
        private final T element;
        public Node(T t){
            this.next = null;
            this.element = t;
        }
    }
    public StackImpl(){
        this.length = 0;
        this.top = null;
    }
    @Override
    public void push(T element) {
        if(element == null){
            return;
        }
        this.length++;
        Node<T> temp = this.top;
        this.top = new Node<T>(element);
        this.top.next = temp;
    }
    @Override
    public T pop() {
        if(this.size() == 0){
            return null;
        }
        this.length--;
        Node<T> temp = this.top;
        this.top = this.top.next;
        return temp.element;
    }

    @Override
    public T peek() {
        return this.length == 0? null:this.top.element;
    }

    @Override
    public int size() {
        return this.length;
    }
}
