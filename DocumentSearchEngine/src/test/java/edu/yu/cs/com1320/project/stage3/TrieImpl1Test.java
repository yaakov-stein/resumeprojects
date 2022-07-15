package edu.yu.cs.com1320.project.stage3;

import edu.yu.cs.com1320.project.impl.TrieImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class TrieImpl1Test {

    @BeforeEach
    void setUp(){
    }
    @Test
    void putIntegersBasic() {
        TrieImpl<Integer> ti = new TrieImpl<>();
        String stringA = "abcde";
        String stringB = "fghij";
        String stringC = "abdij";
        Integer a = 78;
        Integer b = 67890;
        Integer c = 12435;
        ti.put(stringA,a);
        ti.put(stringB,b);
        ti.put(stringB,a);
        ti.put(stringC,c);
        assertEquals(a,ti.getAllSorted("aBcDe", Integer::compare).get(0));
        assertEquals(b,ti.getAllSorted(stringB, (o1, o2) -> o2 - o1).get(0));
        assertEquals(a,ti.getAllSorted("FGHIJ", (o1, o2) -> o2 - o1).get(1));
        assertEquals(c,ti.getAllSorted(stringC, (o1, o2) -> o2 - o1).get(0));
        assertThrows(IllegalArgumentException.class , () -> ti.put(null,5));
        assertThrows(IllegalArgumentException.class , () -> ti.put(stringA,null));
    }

    @Test
    void putIntegersComplex(){

    }

    @Test
    void getAllSortedIntegersBasic() {
        TrieImpl<Integer> ti = new TrieImpl<>();
        String stringA = "abcde";
        Integer a = 78;
        Integer b = 67890;
        Integer c = 12435;
        ti.put(stringA,a);
        ti.put(stringA,b);
        ti.put(stringA,c);
        List<Integer> integerList = ti.getAllSorted("ABcDe", (o1, o2) -> o2 - o1);
        assertEquals(b,integerList.get(0));
        assertEquals(c,integerList.get(1));
        assertEquals(a,integerList.get(2));
        assertThrows(IllegalArgumentException.class , () -> ti.getAllSorted(null,(o1, o2) -> o2 - o1));
        assertThrows(IllegalArgumentException.class , () -> ti.getAllSorted(stringA,null));
    }

    @Test
    void getAllSortedIntegersComplex(){

    }

    @Test
    void getAllSortedDocs(){

    }

    @Test
    void getAllWithPrefixSortedIntegersBasic() {
        TrieImpl<Integer> ti = new TrieImpl<>();
        String stringA = "abcde";
        String stringB = "Aburei";
        String stringC = "ABrew";
        String stringD = "aB";
        String stringE = "a";
        Integer a = 78;
        Integer b = 67890;
        Integer c = 12435;
        Integer d = 10;
        Integer e = 593342;
        ti.put(stringA,a);
        ti.put(stringB,b);
        ti.put(stringC,c);
        ti.put(stringD,d);
        ti.put(stringE,e);
        ti.put(stringA,b);
        List<Integer> integerList = ti.getAllWithPrefixSorted("ab",(o1, o2) -> o2 - o1);
        assertEquals(4,integerList.size());
        assertEquals(b,integerList.get(0));
        assertEquals(c,integerList.get(1));
        assertEquals(a,integerList.get(2));
        assertEquals(d,integerList.get(3));
        }

    @Test
    void getAllWithPrefixIntegersComplex(){

    }

    @Test
    void getAllWithPrefixDocs(){

    }

    @Test
    void deleteAllWithPrefixIntegersBasic() {
        TrieImpl<Integer> ti = new TrieImpl<>();
        String stringA = "a";
        String stringB = "ABCDE";
        String stringC = "AB";
        String stringD = "Abcd";
        String stringE = "abc";
        Integer a = 78;
        Integer b = 67890;
        Integer c = 12435;
        Integer d = 10;
        Integer e = 593342;
        ti.put(stringA,a);
        ti.put(stringB,b);
        ti.put(stringC,c);
        ti.put(stringD,d);
        ti.put(stringE,e);
        assertEquals(4,ti.getAllWithPrefixSorted("ab",Integer::compareTo).size());
        Set<Integer> integerSet = ti.deleteAllWithPrefix("aB");
        assertEquals(4, integerSet.size());
        assertTrue(integerSet.contains(67890));
        assertTrue(integerSet.contains(12435));
        assertTrue(integerSet.contains(10));
        assertTrue(integerSet.contains(593342));
        assertEquals(0,ti.deleteAllWithPrefix("ab").size());
        assertEquals(0,ti.getAllSorted("Abcd",Integer::compareTo).size());
        assertEquals(0,ti.getAllWithPrefixSorted("abc", Integer::compareTo).size());
        assertThrows(IllegalArgumentException.class, () -> ti.deleteAllWithPrefix(null));
    }

    @Test
    void deleteAllWithPrefixIntegersComplex(){

    }

    @Test
    void deleteAllWithPrefixDocs(){

    }

    @Test
    void deleteAllIntegersBasic() {
        //Check that all proper values of a deleteAll call are returned and then a get call as well as another deleteAll call return empty
        //check that this call did not affect other nodes with equivalent values
        TrieImpl<Integer> ti = new TrieImpl<>();
        String stringA = "abcde";
        String stringB = "ABCDE";
        String stringC = "ABcDe";
        String stringD = "Abcd";
        String stringE = "abc";
        Integer a = 78;
        Integer b = 67890;
        Integer c = 12435;
        Integer d = 10;
        Integer e = 593342;
        ti.put(stringA,a);
        ti.put(stringB,b);
        ti.put(stringC,c);
        ti.put(stringD,a);
        ti.put(stringE,b);
        assertEquals(3,ti.getAllSorted("abCDE",Integer::compareTo).size());
        Set<Integer> integerSet = ti.deleteAll("abCDE");
        assertEquals(3,integerSet.size());
        assertTrue(integerSet.contains(78));
        assertTrue(integerSet.contains(67890));
        assertTrue(integerSet.contains(12435));
        assertEquals(0,ti.getAllSorted("ABCDE",Integer::compareTo).size());
        assertEquals(0,ti.deleteAll(stringA).size());
        assertThrows(IllegalArgumentException.class, () -> ti.deleteAll(null));
        assertEquals(a,ti.getAllSorted(stringD,Integer::compareTo).get(0));
        assertEquals(b,ti.getAllSorted(stringE,Integer::compareTo).get(0));
        assertEquals(1,ti.deleteAll(stringD).size());
        assertEquals(0,ti.deleteAll(stringD).size());
    }

    @Test
    void deleteAllIntegersComplex(){

    }

    @Test
    void deleteAllDocs(){

    }

    @Test
    void deleteIntegersBasic() {
        TrieImpl<Integer> ti = new TrieImpl<>();
        String stringA = "abcde";
        String stringB = "Aburei";
        String stringC = "AB";
        String stringD = "IIIII";
        String stringE = "zzzzz";
        Integer a = 78;
        Integer b = 67890;
        Integer c = 12435;
        Integer d = 10;
        Integer e = 593342;
        ti.put(stringA,a);
        ti.put(stringB,b);
        ti.put(stringC,c);
        ti.put(stringD,d);
        ti.put(stringE,e);
        ti.put(stringA,e);
        ti.put(stringB,a);
        ti.put(stringC,b);
        ti.put(stringD,c);
        ti.put(stringE,d);
        assertEquals(c,ti.delete(stringC,c));
        assertEquals(1,ti.getAllSorted(stringC,Integer::compareTo).size());
        assertEquals(b,ti.delete(stringC,b));
        assertEquals(0,ti.getAllSorted(stringC,Integer::compareTo).size());
        assertEquals(e,ti.delete(stringA,e));
        assertEquals(1,ti.getAllSorted(stringA,Integer::compareTo).size());
        assertEquals(a,ti.getAllSorted(stringA,Integer::compareTo).get(0));
        assertEquals(a,ti.delete(stringA,a));
        assertEquals(0,ti.getAllSorted(stringA,Integer::compareTo).size());
        assertNull(ti.delete(stringA,e));
        assertEquals(2,ti.getAllSorted(stringE,Integer::compareTo).size());
        assertThrows(IllegalArgumentException.class , () -> ti.delete(null,e));
        assertThrows(IllegalArgumentException.class , () -> ti.delete(stringA,null));
    }

    @Test
    void deleteIntegersComplex(){

    }

    @Test
    void deleteDocs(){

    }
}