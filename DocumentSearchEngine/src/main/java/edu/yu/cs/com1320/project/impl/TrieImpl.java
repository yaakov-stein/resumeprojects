package edu.yu.cs.com1320.project.impl;

import edu.yu.cs.com1320.project.Trie;
import java.util.*;

public class TrieImpl<Value> implements Trie<Value> {
    private static final int ALPHABETSIZE = 36;
    private final Node<Value> root;
    private static class Node<Value>{
        private Set<Value> values;
        private Node<Value>[] links = new Node[ALPHABETSIZE];
        private int children = 0;
    }
    public TrieImpl(){
        this.root = new Node<>();
    }
    @Override
    public void put(String key, Value val) {
        if(key == null || val == null){
            throw new IllegalArgumentException("Either the Key or Value argument was null");
        }
        Node<Value> locatedNode = this.get(this.root,key.toLowerCase(),0);
        if(locatedNode == null){
            locatedNode = this.put(key.toLowerCase(),this.root,0);
        }
        if(locatedNode.values == null){
            locatedNode.values = new HashSet<>();
        }
        locatedNode.values.add(val);
    }

    private Node<Value> put(String key, Node<Value> node, int current){
        Node<Value> newNode;
        if(key.length() == current){
            newNode = node;
        }else{
            int a = this.getArrayLocation(key.charAt(current));
            if(node.links[a] == null){
                node.children++;
                node.links[a] = new Node<>();
            }
            newNode = this.put(key,node.links[a],current + 1);
        }
        return newNode;
    }
    private Node<Value> get(Node<Value> node, String key, int current){
        if(node == null || key.length() == 0){
            return null;
        }
        return key.length() == current ? node : this.get(node.links[this.getArrayLocation(key.charAt(current))],key, ++current);
    }
    @Override
    public List<Value> getAllSorted(String key, Comparator<Value> comparator) {
        if(key == null || comparator == null){
            throw new IllegalArgumentException("Invalid argument was given for either Key or Comparator.");
        }
        Node<Value> keyNode = this.get(this.root,key.toLowerCase(), 0);
        List<Value> sortedList = keyNode == null || keyNode.values == null ? new ArrayList<>(): new ArrayList<>(keyNode.values);
        sortedList.sort(comparator);
        return sortedList;
    }

    @Override
    public List<Value> getAllWithPrefixSorted(String prefix, Comparator<Value> comparator) {
        if(prefix == null || comparator == null){
            throw new IllegalArgumentException("Invalid argument was given for either Key or Comparator.");
        }
        Node<Value> startingNode = this.get(this.root,prefix.toLowerCase(),0);
        List<Value> listAllWithPrefix = startingNode == null ? new ArrayList<>():new ArrayList<>(this.getAllWithPrefix(startingNode));
        listAllWithPrefix.sort(comparator);
        return listAllWithPrefix;
    }

    private Set<Value> getAllWithPrefix(Node<Value> node){
        Set<Value> allWithPrefix = new HashSet<>();
        if(node.values != null){
            allWithPrefix.addAll(node.values);
        }
        if(node.children > 0){
            for(Node<Value> a:node.links){
                if(a != null){
                    allWithPrefix.addAll(this.getAllWithPrefix(a));
                }
            }
        }
        return allWithPrefix;
    }

    @Override
    public Set<Value> deleteAllWithPrefix(String prefix) {
        if(prefix == null) {
            throw new IllegalArgumentException("Invalid argument for either given Key");
        }
        Node<Value> keyNode = this.get(this.root,prefix.toLowerCase(),0);
        Set<Value> allValuesWithPrefix = null;
        if(keyNode != null){
            allValuesWithPrefix = getAllWithPrefix(keyNode);
            String parentKey = prefix.toLowerCase().substring(0,prefix.length() - 1);
            Node<Value> keyNodeParent = parentKey.length() == 0 ? this.root:this.get(this.root,parentKey,0);
            keyNodeParent.links[this.getArrayLocation(prefix.toLowerCase().charAt(prefix.length() - 1))] = null;
            this.delete(this.root,parentKey,0);
        }
        return allValuesWithPrefix == null ? new HashSet<>():allValuesWithPrefix;
    }

    @Override
    public Set<Value> deleteAll(String key) {
        if(key == null) {
            throw new IllegalArgumentException("Invalid argument for either given Key");
        }
        Node<Value> keyNode = this.get(this.root,key.toLowerCase(),0);
        Set<Value> previouslyContainedValues = null;
        if(keyNode != null && keyNode.values != null){
            previouslyContainedValues = new HashSet<>(keyNode.values);
            keyNode.values = null;
            this.delete(this.root,key.toLowerCase(),0);
        }
        return previouslyContainedValues == null ? new HashSet<>():previouslyContainedValues;
    }

    @Override
    public Value delete(String key, Value val) {
        if(key == null || val == null) {
            throw new IllegalArgumentException("Invalid argument for either given Key or Value");
        }
        boolean success = false;
        Node<Value> keyNode = this.get(this.root,key.toLowerCase(),0);
        if(keyNode != null && keyNode.values != null){
            success = keyNode.values.remove(val);
            if(keyNode.values.isEmpty()){
                this.delete(this.root,key.toLowerCase(),0);
            }
        }
        return success ? val:null;
    }

    private Node<Value> delete(Node<Value> node, String key, int current){
        Node<Value> currentNode = null;
        if(key.length() != current){
            Node<Value> returnedNode = this.delete(node.links[this.getArrayLocation(key.charAt(current))],key, current + 1);
            node.links[this.getArrayLocation(key.charAt(current))] = returnedNode;
            node.children = returnedNode == null ? node.children - 1: node.children;
        }
        if((node.values != null && !node.values.isEmpty()) || node.children > 0){
                currentNode = node;
        }
        return currentNode;
    }
    private int getArrayLocation(char current){
        if((current < 48 || current > 57) && (current > 122 || current < 97)){
            throw new IllegalArgumentException ("Invalid Character");
        }
        if(current <= 57){
            return (current - 48);
        }else{
            return (current - 97);
        }
    }
}
