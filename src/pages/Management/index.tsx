import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import wordApi, { ICreateWord } from "../../api/wordApi";
import Heading from "../../components/Heading";
import { setToast } from "../../redux/toastSlice";

export default function Management() {
  interface IPendingWord extends ICreateWord {
    _id: string;
  }

  const [listPending, setListPending] = useState([]);
  const [changeList,setChangeList] = useState<boolean>(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPendingList = async () => {
      const res: any = await wordApi.getAllPendingWord();
      setListPending(res?.data);
    };
    fetchPendingList();
  },[changeList]);

  const handleAccept = async (pendingword: IPendingWord) => {
    const payload: ICreateWord = {
      author: pendingword.author,
      authorNote: pendingword.authorNote,
      word: pendingword.word,
    };

    const accept: any = await wordApi.createWord(payload);

    if (!accept.err) {
      dispatch(
        setToast({
          type: "success",
          heading: "Thành công",
          content: `Đã thêm '${pendingword.word}' vào cơ sở dữ liệu `,
          show: true,
        })
      );
      await wordApi.deleteWord(pendingword._id);
      setChangeList(!changeList)
    }else{
      dispatch(
        setToast({
          type: "danger",
          heading: "Thất bại",
          content: `Không thể thêm '${pendingword.word}' vào cơ sở dữ liệu `,
          show: true,
        })
      ); 
    }
  };

  const handleDelete = async (_id:string) => {
    const res:any = await wordApi.deleteWord(_id);
    if(res.state === 'success') {
      dispatch(
        setToast({
          type: "success",
          heading: "Thành công",
          content: `Đã xóa từ này ra khỏi danh sách `,
          show: true,
        })
      );
      setChangeList(!changeList)
    }else {
      dispatch(
        setToast({
          type: "danger",
          heading: "Thất bại",
          content: `Có lỗi, xóa từ không thành công`,
          show: true,
        })
      );
    }
  };

  return (
    <div>
      <Heading type=""></Heading>
      <h2 className="text-center mb-5">Management</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Author</th>
            <th>Word</th>
            <th>Note</th>
            <th>Management</th>
          </tr>
        </thead>
        <tbody>
          {listPending &&
            listPending.map((e: IPendingWord, indx) => (
              <tr key={e?._id || indx}>
                <td>{indx + 1}</td>
                <td>{e?.author}</td>
                <td>{e?.word}</td>
                <td>{e?.authorNote}</td>
                <td>
                  <Button variant="success" onClick={() => handleAccept(e)}>
                    Duyệt
                  </Button>{" "}
                  <Button variant="danger" onClick={()=>handleDelete(e._id)}>
                    Xóa
                  </Button>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
