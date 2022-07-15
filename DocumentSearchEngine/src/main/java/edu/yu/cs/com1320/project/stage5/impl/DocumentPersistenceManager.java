package edu.yu.cs.com1320.project.stage5.impl;

import com.google.gson.*;
import edu.yu.cs.com1320.project.stage5.Document;
import edu.yu.cs.com1320.project.stage5.PersistenceManager;
import jakarta.xml.bind.DatatypeConverter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class DocumentPersistenceManager implements PersistenceManager<URI, Document> {
    private class DocSerializer implements JsonSerializer<Document>, JsonDeserializer<Document>{
        @Override
        public JsonElement serialize(Document document, Type type, JsonSerializationContext jsonSerializationContext) {
            JsonObject docJson = new JsonObject();
            docJson.addProperty("uri", document.getKey().toASCIIString());
            if(document.getDocumentTxt() == null){
                docJson.addProperty("binaryData",DatatypeConverter.printBase64Binary(document.getDocumentBinaryData()));
            }else{
                docJson.addProperty("txt",document.getDocumentTxt());
            }
            docJson.addProperty("wordMap",document.getWordMap().toString());
            return docJson;
        }

        @Override
        public DocumentImpl deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
            JsonObject jo = jsonElement.getAsJsonObject();
            DocumentImpl doc;
            if(jo.has("txt")){
                doc = new DocumentImpl(
                        URI.create(jo.get("uri").getAsString()),
                        jo.get("txt").getAsString(),
                        this.makeProperMap((new Gson()).fromJson(jo.get("wordMap").getAsString(), Map.class))
                );
            }else{
                doc = new DocumentImpl(
                        URI.create(jo.get("uri").getAsString()),
                        DatatypeConverter.parseBase64Binary(jo.get("binaryData").getAsString())
                );
            }
            return doc;
        }
        private Map<String, Integer> makeProperMap(Map<String,Double> badMap){
            Map<String,Integer> newMap = new HashMap<>();
            for(String a: badMap.keySet()){
                newMap.put(a, badMap.get(a).intValue());
            }
            return newMap;
        }
    }
    private String baseDir;
    public DocumentPersistenceManager(File baseDir){
        this.baseDir = baseDir == null ? System.getProperty("user.dir"): String.valueOf(baseDir);
    }

    @Override
    public void serialize(URI uri, Document val) throws IOException {
        if(uri == null) return;
        File current = new File(this.baseDir + uri.getSchemeSpecificPart() + ".json");
        current.getParentFile().mkdirs();
        FileWriter writer = new FileWriter(current);
        Gson gson = new GsonBuilder().registerTypeAdapter(DocumentImpl.class, new DocSerializer()).create();
        writer.write(gson.toJson(val));//needs fixing
        writer.close();
    }

    @Override
    public Document deserialize(URI uri) throws IOException {
        return uri == null ? null:new GsonBuilder()
                .registerTypeAdapter(DocumentImpl.class, new DocSerializer())
                .create()
                .fromJson(new String(Files.readAllBytes(Paths.get(this.baseDir + uri.getSchemeSpecificPart() + ".json"))),DocumentImpl.class);
    }

    @Override
    public boolean delete(URI uri) throws IOException {
        File current = new File(this.baseDir + uri.getSchemeSpecificPart() + ".json");
        boolean a = current.delete();
        this.deleteFurther(current);
        return a;
    }
    private void deleteFurther(File file){
        File parentFile = file.getParentFile();
        if (parentFile != null && file.getParentFile().list().length == 0) {
            parentFile.delete();
            this.deleteFurther(parentFile);
        }
    }
}
