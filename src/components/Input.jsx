import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from './Info';
import { connect } from 'react-redux'
import { actionAddInfo, actionSearch, actionUpdateInfo, actionReset } from '../store/action'
import { infoEnums } from '../utils/constant';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValues: {
        maSV: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
      },
      errors: {
        maSV: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
      }
    }
  }

  handleReset = () => {
    this.props.reset()
    this.setState({
      errors: {
        maSV: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedInfo !== this.props.selectedInfo) {
      this.setState({
        inputValues: this.props.selectedInfo || {
          maSV: '',
          hoTen: '',
          soDienThoai: '',
          email: '',
        },
        errors: {
          maSV: '',
          hoTen: '',
          soDienThoai: '',
          email: '',
        }
      });
    }
  }


  handleOnInput = (e) => {
    // ? mỗi lần nhập một kí tự trong input thì lấy giá trị từ input
    const { name, value, pattern } = e.target
    // ? rồi gán vào state tương ứng với name của input đó
    const newInputValues = { ...this.state.inputValues, [name]: value }

    let errors = { ...this.state.errors }
    if (!value.trim()) {
      errors[name] = infoEnums[name] + ' không được để trống'
    } else {
      if (pattern) {
        if (!value.match(pattern)) {
          if (name === 'maSV') {
            errors[name] = infoEnums[name] + ' chỉ được chứa chữ cái và số'
          } else if (name === 'soDienThoai') {
            errors[name] = infoEnums[name] + ' không đúng định dạng'
          } else if (name === 'email') {
            errors[name] = infoEnums[name] + ' không đúng định dạng'
          } else if (name === 'hoTen') {
            errors[name] = infoEnums[name] + ' chỉ được chứa chữ cái và khoảng trắng'
          }
        }
        else {
          if (value.length < 2) {
            if (name === 'hoTen') {
              errors[name] = infoEnums[name] + ' không được nhỏ hơn 2 kí tự'
            }
          }
          else if (value.length > 50) {
            errors[name] = infoEnums[name] + ' quá dài'
          }
          else {
            if (this.props.listInfo?.find(item => item[name].toLowerCase() === value.toLowerCase() && item.maSV !== this.props.selectedInfo?.maSV)) {
              // Check for duplicate values only if the field is different from the selected info
              errors[name] = infoEnums[name] + ' đã tồn tại';
            } else {
              errors[name] = '';
            }

          }
        }
      }
    }

    this.setState({ inputValues: newInputValues, errors: errors })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    let errors = { ...this.state.errors };

    // Check for empty fields
    Object.entries(this.state.inputValues).forEach(([name, value]) => {
      if (!value.trim()) {
        errors[name] = infoEnums[name] + ' không được để trống';
        isValid = false;
      }
    });

    if (isValid) {
      // Perform additional validation
      Object.values(this.state.errors).forEach(element => {
        if (element) {
          isValid = false;
        }
      });

      if (isValid) {
        if (this.props.selectedInfo) {
          this.props.updateInfo(this.state.inputValues);
        } else {
          this.props.addInfo(this.state.inputValues);
        }
        this.setState({
          inputValues: {
            maSV: '',
            hoTen: '',
            soDienThoai: '',
            email: '',
          },
          errors: {
            maSV: '',
            hoTen: '',
            soDienThoai: '',
            email: '',
          },
        });
      }
    }

    this.setState({ errors });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 mx-auto">
            <h3 className="display-4 text-center">Quản Lý sinh viên</h3>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor>Mã sinh viên : </label>
                  <input
                    name="maSV"
                    type="text"
                    className="form-control"
                    onBlur={this.handleOnInput}
                    onInput={this.handleOnInput}
                    value={this.state.inputValues.maSV}
                    pattern="^[a-zA-Z0-9]+$"
                    disabled={this.props.selectedInfo}
                  />
                  {this.state.errors.maSV && (
                    <span className="text-danger">{this.state.errors.maSV}</span>
                  )}
                </div>
                <div className="col-6 form-group">
                  <label htmlFor>Họ và tên : </label>
                  <input
                    name="hoTen"
                    type="text"
                    className="form-control"
                    onBlur={this.handleOnInput}
                    onInput={this.handleOnInput}
                    value={this.state.inputValues.hoTen}
                    pattern="^[a-zA-ZÀ-ỹ\s]+$"
                  />
                  {this.state.errors.hoTen && (
                    <span className="text-danger">{this.state.errors.hoTen}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor>Số điện thoại : </label>
                  <input
                    name="soDienThoai"
                    type="text"
                    className="form-control"
                    onBlur={this.handleOnInput}
                    onInput={this.handleOnInput}
                    value={this.state.inputValues.soDienThoai}
                    pattern="^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$"
                  />
                  {this.state.errors.soDienThoai && (
                    <span className="text-danger">{this.state.errors.soDienThoai}</span>
                  )}
                </div>
                <div className="col-6 form-group">
                  <label htmlFor>Email: </label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    onBlur={this.handleOnInput}
                    onInput={this.handleOnInput}
                    value={this.state.inputValues.email}
                    pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                  />
                  {this.state.errors.email && (
                    <span className="text-danger">{this.state.errors.email}</span>
                  )}
                </div>
              </div>
              <div className="form-group text-center">
                {!this.props.selectedInfo && <button id="btnThem" type="submit" className="btn btn-success">
                  Thêm Sinh Viên
                </button>}
                {this.props.selectedInfo && <button id="btnCapNhat" type="submit" className="btn btn-info">
                  Cập Nhật
                </button>}
                <button type="button" className="btn btn-dark" onClick={this.handleReset}>
                  Reset
                </button>
              </div>
            </form>
            <br />
            <div className="row">
              <div className="col-12 form-group d-flex">
                <span className='align-self-center mr-2'><i className="fa fa-search" /></span>
                <input placeholder="Nhập thông tin tìm kiếm..." type="text" className="form-control" onChange={(event) => this.props.searchInfo(event.target.value)} />
              </div>
            </div>
          </div>
          <Info />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listInfo: state.infoReducer.listInfo,
    selectedInfo: state.infoReducer.selectedInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addInfo: (info) => dispatch(actionAddInfo(info)),
    searchInfo: (keyword) => dispatch(actionSearch(keyword)),
    updateInfo: (info) => dispatch(actionUpdateInfo(info)),
    reset: () => dispatch(actionReset())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Input)