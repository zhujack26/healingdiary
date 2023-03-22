package com.ssafy.healingdiary.infra.storage;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface storageClient {
    String uploadFile(MultipartFile file) throws IOException;
    void deleteFile(String fileUrl) throws IOException;

}
