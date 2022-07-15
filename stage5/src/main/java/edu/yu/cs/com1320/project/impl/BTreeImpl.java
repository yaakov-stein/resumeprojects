package edu.yu.cs.com1320.project.impl;

import edu.yu.cs.com1320.project.BTree;
import edu.yu.cs.com1320.project.stage5.PersistenceManager;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BTreeImpl<Key extends Comparable<Key>,Value> implements BTree<Key , Value> {
    //max children per B-tree node = MAX-1 (must be an even number and greater than 2)
    private static final int MAX = 6;
    private Node root; //root of the B-tree
    private int height; //height of the B-tree
    private PersistenceManager<Key,Value> persistenceManager;
    private class Node {
        private int entryCount;
        //private Entry[] entries = (Entry[])new Object[MAX];
        private final List<Entry> entries = new ArrayList<>(MAX);
        private Node(int k) {
            this.entryCount = k;
        }
    }

    private class Entry {
        private Key key;
        private Value val;
        private Node child;

        private Entry(Key key, Value val, Node child) {
            this.key = key;
            this.val = val;
            this.child = child;
        }
    }

    public BTreeImpl() {
        this.root = new Node(0);
    }

    @Override
    public Value get(Key k) {
        if (k == null) {
            throw new IllegalArgumentException("Argument is null");
        }
        Entry entry = this.get(this.root, k, this.height);
        if(entry != null) {
            if(entry.child != null){
                try {
                    entry.val = this.persistenceManager.deserialize(k);
                    entry.child = null;
                    this.persistenceManager.delete(k);
                } catch (IOException e) {
                    throw new IllegalStateException("Was not able to deserialize");
                }
            }
            return entry.val;
        }
        return null;
    }

    private Entry get(Node currentNode, Key key, int height) {
        //Entry[] entries = currentNode.entries;
        List<Entry> entries = currentNode.entries;
        if (height == 0) {
            for (int j = 0; j < currentNode.entryCount; j++) {
                if(this.isEqual(key, entries.get(j).key/*entries[j].key*/)) {
                    return entries.get(j)/*entries[j]*/;
                }
            }
        } else {
            for (int j = 0; j < currentNode.entryCount; j++){
                if (j + 1 == currentNode.entryCount || this.isLess(key, entries.get(j + 1).key /*entries[j + 1].key*/)) {
                    return this.get(entries.get(j).child/*entries[j].child*/, key, height - 1);
                }
            }
        }
        return null;
    }

    @Override
    public Value put(Key k, Value v) {
        if (k == null) {
            throw new IllegalArgumentException("Argument is null");
        }
        Entry alreadyThere = this.get(this.root, k, this.height);
        if(alreadyThere != null) {
            Value oldVal;
            if(alreadyThere.child != null){
                try {
                    oldVal = this.persistenceManager.deserialize(k);
                    alreadyThere.child = null;
                } catch (IOException e) {
                    throw new IllegalStateException("Was not able to deserialize");
                }
            }else oldVal = alreadyThere.val;

            alreadyThere.val = v;
            return oldVal;
        }
        Node newNode = this.put(this.root, k, v, this.height);
        if (newNode == null) return null;
        Node newRoot = new Node(2);
        newRoot.entries.add(0, new Entry(this.root.entries.get(0).key,null,this.root));
        newRoot.entries.add(1, new Entry(newNode.entries.get(0).key,null,newNode));
        this.root = newRoot;
        this.height++;
        return null;
    }

    private Node put(Node currentNode, Key key, Value val, int height){
        int j;
        Entry newEntry = new Entry(key, val, null);
        if (height == 0) {
            for (j = 0; j < currentNode.entryCount && !this.isLess(key, currentNode.entries.get(j)/*[j]*/.key); j++) {}
        } else {
            for (j = 0; j < currentNode.entryCount; j++) {
                if ((j + 1 == currentNode.entryCount) || this.isLess(key, currentNode.entries.get(j + 1)/*[j + 1]*/.key)) {
                    Node newNode = this.put(currentNode.entries.get(j++)/*[j++]*/.child, key, val, height - 1);
                    if (newNode == null) return null;
                    newEntry.key = newNode.entries.get(0)/*[0]*/.key;
                    newEntry.val = null;
                    newEntry.child = newNode;
                    break;
                }
            }
        }
        for (int i = currentNode.entryCount; i > j; i--) {
            //currentNode.entries[i] = currentNode.entries[i - 1];
            if(i == currentNode.entryCount) currentNode.entries.add(i,currentNode.entries.get(i - 1));
            else currentNode.entries.set(i,currentNode.entries.get(i - 1));
        }
        //currentNode.entries[j] = newEntry;
        if(currentNode.entries.size() == j) currentNode.entries.add(j, newEntry);
        else currentNode.entries.set(j, newEntry);
        currentNode.entryCount++;
        if (currentNode.entryCount < MAX) return null;
        else return this.split(currentNode);
    }

    private Node split(Node currentNode) {
        Node newNode = new Node(MAX / 2);
        currentNode.entryCount = MAX / 2;
        //System.arraycopy(currentNode.entries, MAX / 2, newNode.entries, 0, MAX / 2);
        for (int j = 0; j < MAX / 2; j++) {
            //newNode.entries[j] = currentNode.entries[MAX / 2 + j];
            newNode.entries.add(j, currentNode.entries.get(MAX / 2 + j));
        }
        return newNode;
    }

    private boolean isLess(Key k1, Key k2) {
        return k1.compareTo(k2) < 0;
    }

    private boolean isEqual(Key k1, Key k2){
        return k1.compareTo(k2) == 0;
    }

    @Override
    public void moveToDisk(Key k) throws IOException {
        Entry holdingEntry = this.get(this.root,k,this.height);
        if(holdingEntry != null){
            Value priorValue = holdingEntry.val;
            holdingEntry.val = null;
            holdingEntry.child = new Node(1);
            this.persistenceManager.serialize(k,priorValue);
        }
    }

    @Override
    public void setPersistenceManager(PersistenceManager<Key,Value> pm) {
        this.persistenceManager = pm;
    }
}