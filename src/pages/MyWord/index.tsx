import { useSelector } from "react-redux";
import { Table, Container } from "react-bootstrap";
import classNames from "classnames/bind";
import { IRootState, IWordContributed } from "../../components/interface";
import Heading from "../../components/Heading";
import style from './MyWord.module.css'


const cx = classNames.bind(style) 
export default function MyWord() {

  const wordContributed = useSelector(
    (state: IRootState) => state.auth.wordContributed
  );

  return (
    <div className={cx('myWord')}>
      <Heading type=""></Heading>
      <h3 className="text-center mt-5 mb-5">Các từ bạn đã đóng góp</h3>
      <Container className={cx('myword__container')}>
        <Table  className="mb-5 " striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Word</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {wordContributed.map((e:IWordContributed, ind) => {
              return (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>{e.word}</td>
                  <td>{e.authorNote}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
