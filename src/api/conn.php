<?PHP
header('Content-type:text/html;charset=utf-8');//防止中文乱码

   //连接数据库
   $severname = 'localhost' ;
   $username  = 'root';
   $pwd = '';
   $dbname = '9527';

   //通过构造函数 mysqli()建立连接
   $conn = new mysqli($severname,$username,$pwd,$dbname);

    //js调用对象的属性和方法：用.    arr.length  arr.sort()
    //php调用对象的属性和方法：->  $conn->connect_error
    if($conn ->connect_error){
        die('链接错误'.$conn->connect_error);
    }
    // echo "链接成功";
?>