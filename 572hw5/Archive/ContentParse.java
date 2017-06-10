import org.jsoup.Jsoup;
import org.jsoup.helper.Validate;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.apache.tika.Tika;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;

import java.io.*;
import java.util.*;

import java.util.*;
public class ContentParse {
    public static void main(String[] args) throws Exception {
        // 创建 Tika实例
        Tika tika = new Tika();
        // 使用tika对文件内容进行抽取，对常用的文档格式进行测试
//      String filePath="D:/tikatest/test.pdf";
//      String filePath="D:/tikatest/test.doc";
//      String filePath="D:/tikatest/test.docx";
//      String filePath="D:/tikatest/test.txt";
//      String filePath="D:/tikatest/test.ppt";
//      String filePath="D:/tikatest/test.wps";
        long st = System.currentTimeMillis();
        String dirPath = "/Users/junzhiwa/downloads/LATimesData/LATimesDownloadData/";
        String dictPath = "big.txt";
        File root = new File(dirPath);
        FileOutputStream dictfos = new FileOutputStream(dictPath);
        OutputStreamWriter dictosw = new OutputStreamWriter(dictfos, "UTF-8");
        File[] fileList = root.listFiles();
        Set<String> set = new HashSet<String>();
        int i = 0;
        for(File f : fileList) {
            System.out.println(++i);
            if (!f.isDirectory()) {
                String outputPrefix = "/Users/junzhiwa/downloads/LATimesData/page/";
                String text = tika.parseToString(f);
                String[] tokens = text.trim().split("\\s+");
                for (String token : tokens) {
                    dictosw.write(token + " ");
                }
                String name = f.getName();
                name = outputPrefix + name.substring(0, name.lastIndexOf(".html")) + ".txt";
                System.out.println(name);
                FileOutputStream fos = new FileOutputStream(name);
                OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");
                osw.write(text);
                osw.flush();
                osw.close();
            }
        }
        dictosw.flush();
        dictosw.close();
        Long ed = System.currentTimeMillis();
        System.out.println(ed-st);
    }
}

