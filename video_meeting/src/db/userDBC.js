const mysql = require('mysql2');

// mysql의 데이터 베이스 스키마 접속 정보
// MySQL 데이터베이스와 연결

//mysql.createPool: 연결 풀을 사용하여 효율적으로 데이터베이스 연결을 관리합니다. 여러 클라이언트가 동시에 접근할 때 유리하며, 성능이 좋습니다.
//mysql.createConnection: 각 요청마다 새로운 데이터베이스 연결을 생성하므로 간단한 사용에 유리하지만, 연결 관리와 성능 면에서는 한계가 있을 수 있습니다.

const pool = mysql.createPool
({
  host: 'localhost', //MySQL 서버의 호스트 주소-데이터 베이스 소유자의 ip
  user: 'root', //MySQL 서버에 연결할 사용자 이름-나의 사용자 이름
  password: "Password2024!", // user의 비밀번호-나의 비밀번호
  database: "book_library", // 엑세스할 데이터베이스
  port: "3306" // MySQL 포트 번호
  // waitForConnections: true, // 모든 연결이 사용 중일 때 새로운 연결 요청이 대기열에 들어가는지 여부
  // onnectionLimit: 10, //결 풀이 최대로 유지할 수 있는 연결 수
  // queueLimit: 0 //대기열에 추가할 수 있는 최대 연결 요청 수
});

// 쿼리을 실행하는 함수. 결과값은 쿼리 값들.
const getUsers = async ()=>
{
    // MySQL 연결 풀(pool)에서 promisePool을 생성합니다.
    // 이를 통해 promise 기반의 쿼리를 실행할 수 있습니다.
    const promisePool = pool.promise();
    // promisePool을 사용하여 'select * from member;' 쿼리를 실행합니다.
    // await 키워드를 사용하여 비동기적으로 결과를 기다립니다.
    const [rows] = await promisePool.query('select * from member;');
    // 쿼리 결과(rows)를 콘솔에 출력합니다. (개발 및 디버깅 용도)
    console.log(rows);
    return rows;
};



//이 함수를 다른 파일에서 사용할 수 있도록 함수들을 module화. 
//const userDBC = require('./userDBC');해서 모듈을 가져오고,
//const rows = await userDBC.getUsers();해서 사용하면 됨.
module.exports = 
{
    getUsers
};