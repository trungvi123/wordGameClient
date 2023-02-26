import Board from "../../components/Board";
import Heading from "../../components/Heading";
import KeyBoard from "../../components/KeyBoard";
import authApi from "../../api/authApi";
import wordApi from "../../api/wordApi";


function Home() {

  const getWord = async ()=> {
    const result = await wordApi.getAllWord()
    if(result){
      console.log(result);

    }
  }



  const login = async ()=> {
    const data = {
      userName : 'hehe',
      password : '123'
    }
    const result:any = await authApi.signIn(data)
    console.log(result);
    localStorage.setItem("gameToken", JSON.stringify(result?.accessToken || ''))
    
  }


  return (
    <div>
      <Heading title="Word game"></Heading>
      <Board></Board>
      <KeyBoard></KeyBoard>
      <button onClick={getWord}>get word</button>
      <button onClick={login}>login</button>
    </div>
  );
}

export default Home;
