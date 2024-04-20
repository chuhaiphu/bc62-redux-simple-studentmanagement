import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import { actionDeleteInfo, actionSetSelectedInfo } from '../store/action';

class Info extends Component {
  handleDeleleInfo = (maSV) => {
    this.props.deleteInfo(maSV)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listInfo !== this.props.listInfo) {
      localStorage.setItem('listInfo', JSON.stringify(this.props.listInfo));
    }
  }

  renderListInfo = (searchedListInfo) => {
    return searchedListInfo.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.maSV}</td>
          <td>{item.hoTen}</td>
          <td>{item.soDienThoai}</td>
          <td>{item.email}</td>
          <td>
            <button className='mr-2 update-btn' onClick={() => this.handleSetSelectedInfo(item)}>
              <i className="fa fa-sync text-primary"></i>
            </button>
            <button className='mr-2 delete-btn' onClick={() => this.handleDeleleInfo(item.maSV)}>
              <span><i className="fa fa-trash-alt text-danger"></i></span>
            </button>
          </td>
        </tr>
      )
    })
  }
  
  handleSetSelectedInfo = (info) => {
    this.props.setSelectedInfo(info)
  }

  render() {
    const searchedListInfo = this.props.listInfo.filter((sv) =>
      sv.maSV.toLowerCase().includes(this.props.keyword.toLowerCase()) ||
      sv.hoTen.toLowerCase().includes(this.props.keyword.toLowerCase()) ||
      sv.soDienThoai.toLowerCase().includes(this.props.keyword.toLowerCase()) ||
      sv.email.toLowerCase().includes(this.props.keyword.toLowerCase())
    );

    return (
      <div className="col-8 mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="tbodySinhVien">
            {this.renderListInfo(searchedListInfo)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listInfo: state.infoReducer.listInfo,
    keyword: state.infoReducer.keyword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteInfo: (maSV) => dispatch(actionDeleteInfo(maSV)),
    setSelectedInfo: (info) => dispatch(actionSetSelectedInfo(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info)