import { ElLoading } from "element-plus";
import domtoimage from "dom-to-image";
import saveAs from "save-as";

const createImgHandle = (width: number, height: number): void => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "图片生成中...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const el: any = document.getElementById("edit");
  domtoimage
    .toBlob(el, {
      height,
      width,
    })
    .then(function (blob: any): void {
      saveAs(blob, "img.png");
      loadingInstance.close();
    })
    .catch((error: any): void => {
      console.log("error:", error);
      loadingInstance.close();
    });
};

export default createImgHandle;
