'use strict';

var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({
    host: '61.255.238.83',
    user: 'postgres',
    password: 'P@ssw0rd',
    database: 'postgres',
    port: 5432
});

router.get("/pasing/:cur",(req,res)=>{

    //페이지당 게시물 수: 한 페이지당 10개 게시물
    var page_size = 10;
    var page_list_size = 10;
    //전체 게시물의 숫자
    var totalPageCount = 0;
    // 현재 페이지
    var curPage = req.params.cur;
    // limit 변수
    var no ='';



    var queryString = 'select count(1) as cnt from iftg.adtn_prod_lst';
    pool.query(queryString,(err,data)=>{
        if(err){
            console.log(err+"메인 화면 조회 실패");
            res.render('data', { title: 'boadrd', data: null, message: "ERROR is occured!" }); 
            return;
        }

        
        //전체 개시물의 숫자
        totalPageCount = data.rows[0].cnt;
       
       
        console.log("현재 페이지 :"+curPage, "전체 페이지 :"+totalPageCount);

        //전체페이지 갯수
        if(totalPageCount < 0){
            totalPageCount = 0;
        }

        var totalPage = Math.ceil(totalPageCount / page_size); //전체 페이지수
        var totalSet = Math.ceil(totalPage / page_list_size); //전체 세트수
        var curSet = Math.ceil(curPage / page_list_size); //현재 세트번호
        var startPage = ((curSet -1) * 10 )+1; //현재 세트내 출력될 시작 페이지
        var endPage = (startPage + page_list_size)-1; // 현재 세트내 출력돌 마지막 페이지

        //현재 페이지가 0보다 작으면
        if(curPage < 0){
            no = 0;
        }else{
            no = (curPage -1);
        }
        
        console.log('[0] curPage : ' + curPage + ' | [1] page_list_size : ' + page_list_size + ' | [2] page_size : ' + page_size + ' | [3] totalPage : ' + totalPage + ' | [4] totalSet : ' + totalSet + ' | [5] curSet : ' + curSet + ' | [6] startPage : ' + startPage + ' | [7] endPage : ' + endPage);
        var result2 = {
            "curPage": curPage,
            "page_list_size": page_list_size,
            "page_size": page_size,
            "totalPage": totalPage,
            "totalSet": totalSet,
            "curSet": curSet,
            "startPage": startPage,
            "endPage": endPage
            };            
        
            console.log(result2);
            // var queryString = 'select * from iftg.adtn_prod_lst limit $1 offset $2';
            var queryString = 'select * from iftg.adtn_prod_lst';
            pool.query(queryString,
                //[page_size, page_size], 
                (err,data)=>{
                if(err){
                    console.log(err+" 조회 실패");
                    res.render('dataGrid', { data: null, message: "ERROR is occured!" }); 
                    return;
                }
                
                const data2 = [];
                data.rows.forEach(element => {
                    data2.push(element.prodparamlist);
                });
                
                
                
                res.render('dataGrid', { title: '게시판 시작', data: JSON.stringify(data.rows), data2: data2 , curPage: curPage, totalPage: totalPage,totalSet: totalSet,curSet: curSet, endPage: endPage});                               

            });
    });
    


    

});
// 메인 화면
router.get("/main", (req,res)=>{
    console.log("Main View");
    res.redirect('pasing/' +1 );
});

//삭제
router.get("/delete/:id", (req,res)=>{
    console.log('Deleting ...')

    var queryString = 'delete from from iftg.adtn_prod_lst where id = ?';
    pool.query(queryString,[req.params.id],()=>{
        res.redirect('/main');
    })
});

//삽입
// router.get("/insert",(req,res)=>{
//     console.log("Insert View");

//     false.reaFile
// })


//수정페이지
router.get("/edit/:id",(req,res)=>{
    console.log("Modifing ...")
    res.render('edit', { title: 'Board Title1' });
})
/* GET home page. */
router.get('/', function(req, res) {
  res.render('dataGrid', { title: '게시판 get home page' });
});


module.exports = router;
