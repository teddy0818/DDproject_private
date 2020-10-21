// function setPics(event){
//         for (const mfile of event.target.files) {
//             let reader = new FileReader()
    
//             reader.onload = function(event) {
//                 let imgs = document.createElement('img')
//                 let div = document.createElement('div')
//                 let del = document.createElement('span')
//                 imgs.setAttribute('src', event.target.result)
//                 div.setAttribute('class', 'div-pic')
//                 del.setAttribute('class', 'material-icons')
//                 del.innerText='close'
//                 let containter = document.querySelector(".pics")
//                 div.append(del)
//                 div.append(imgs)
//                 containter.append(div)
    
//             };
//             reader.readAsDataURL(mfile)
//         }
//     }

////////////////////////////////// 사진등록
var sel_files = [];

$(document).ready(function() {
    $("#input_img").on("change", handleImgFileSelect);
    $("#input_img").on("click", limitIMG);
}); 

// 전역변수 - 이미지의 배열
var imgArr;

// 상품등록 클릭 시 함수호출, 이미지가 5개인 경우 업로드 불가능.
function limitIMG() {
    imgArr = document.getElementsByClassName("selProductFile");
    console.log(imgArr.length);
    if(imgArr.length > 4) {
        alert("5개가 넘었습니다");
        document.getElementById("input_img").type = "text";
        document.getElementById("input_img").readOnly = "true";
    }
    if(imgArr.length < 5) {
        document.getElementById("input_img").type = "file";
        document.getElementById("input_img").readOnly = "false";
    }
}

function fileUploadAction() {
    test += 1;
    console.log("fileUploadAction");
    $("#input_img").trigger('click');
}

function handleImgFileSelect(e) {


    
    sel_files = [];
    $("#img_").empty();

    var files = e.target.files;

    // 이미지 갯수에 따라 파일 업로드 수 제한!!
    for(var i=0; i<6; i++) {
        if(imgArr.length == i) {
            if(files.length > 5-i) {
                alert('이미지는 5장을 넘길수 없습니다');
                return false;
            }
        }
     }

    var filesArr = Array.prototype.slice.call(files);
    
    var index = 0;

    filesArr.forEach(function(f) {
        
        if(!f.type.match("image.*")) {
            alert("이미지만 업로드 가능합니다.");
            return;
        }

        sel_files.push(f)

        var reader = new FileReader();

        reader.onload = function(e) {
            
            var html = "<a href=\"javascript:void(0);\" onclick=\"deleteImageAction("+index+")\" id=\"img_"+index+"\"><img src=\"" + e.target.result + "\" data-file='"+f.name+"' class='selProductFile' title='Click to remove'></a>";              
            
            $(".reg").append(html);
            index++;

            

        }
        reader.readAsDataURL(f);
    });
}

function deleteImageAction(index) {   
             
    //console.log("index : "+index);

    sel_files.splice(index, 1);
    
    var img_id = "#img_"+index;
    $(img_id).remove();

    //console.log(sel_files);
}    

// 사진 클릭했을시 input 버튼 실행
$(".imgClass").click( () => {
$("#input_img").click();

});