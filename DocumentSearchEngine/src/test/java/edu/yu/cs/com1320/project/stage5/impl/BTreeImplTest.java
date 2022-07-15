package edu.yu.cs.com1320.project.stage5.impl;

import org.junit.jupiter.api.Test;

class BTreeImplTest {
    private DocumentStoreImpl docStore;
    @Test
    void get() {
        //1. BTree.get must bring a document on disk back to memory
        //2. BTree.get should bring doc on disk back to memory and put other docs onto disk if bringing original doc puts over memory limits
        //3. When BTree.get brings a document back from disk, ensure that the lastusetime is updated and the doc on disk is deleted
        //4. If BTree.put is called with a value and that value previously had a doc on disk,
        // that doc on disk should be deleted and the new doc should be in memory
    }

    @Test
    void getDocFromDisk(){
        this.docStore = new DocumentStoreImpl();

    }

    @Test
    void put() {
    }

    @Test
    void moveToDisk() {
        //Ensure that when memory is overfilled, the document get written to disk via BTree.moveToDisk and no longer exists in the heap and Btree
    }

    @Test
    void setPersistenceManager() {
    }
}