
import React from 'react';
import Ajax from 'simple-ajax';

import SmartImage from './SmartImage';

export default class PostScreen extends React.Component {
  
  static contextTypes = {
      router: React.PropTypes.object
  };

  static priceMatch = /^[0-9]+(\.[0-9]?[0-9]?)?$/;
  static zeroStrip = /^(0+)/;

  state = {
    image: null,
    posting: false,
  };

  price = 0;

  onFileUpload() {
    var file = this.refs.fileUpload.files[0];

    var fr = new FileReader();
    fr.onload = this.onFileLoaded.bind(this);   // onload fires after reading is complete
    fr.readAsDataURL(file);    // begin reading
  }

  onFileLoaded(data) {
    this.setState({
      image: data.target.result
    })
  }

  checkPrice(e) {

    if (e.target.value.match(PostScreen.priceMatch)) {
      var stripped = e.target.value.replace(PostScreen.zeroStrip, "");
      if (e.target.value != stripped) {
        e.target.value = stripped;
      }
      this.price = e.target.value;
    } else {
      if (e.target.value != "") {
        e.target.value = this.price;
      }
    }

    if (e.target.value == "") {
      this.price = "0";
    }

    // e.target.value = 100;
  }

  submitForm(e) {
    e.preventDefault();

    if (this.state.posting) {
      return;
    }

    this.setState({
      posting: true
    });

    var ajax = new Ajax(
      {
        url: '/api/create',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          title: this.refs.form.inputTitle.value,
          description: this.refs.form.inputDescription.value,
          price: this.refs.form.inputPrice.value,
          image: this.state.image
        })
      }
    );

    ajax.on('success', (e) => {
      var res = JSON.parse(e.target.response);

      if (res.success) {
        this.context.router.push('/item/' + res.id);
      } else {
        this.setState({
          posting: false
        });
      }
    });

    ajax.on('error', () => {
      this.setState({
        posting: false
      });
    });

    ajax.send();
  }

  render() {
    return <div>
      <form className="form-horizontal" ref="form" onSubmit={this.submitForm.bind(this)}>

          <div className="form-group">
              <label htmlFor="inputTitle" className="col-sm-2 control-label">Title</label>
              <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputTitle" placeholder="Title" />
              </div>
          </div>

          <div className="form-group">
              <label htmlFor="inputDescription" className="col-sm-2 control-label">Description</label>
              <div className="col-sm-10">
                  <textarea className="form-control" id="inputDescription" placeholder="Description" />
              </div>
          </div>

          <div className="form-group">
              <label htmlFor="inputPrice" className="col-sm-2 control-label">Price $</label>
              <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputPrice" placeholder="Price" onChange={this.checkPrice.bind(this)}/>
              </div>
          </div>

          <div className="form-group">
              <label htmlFor="inputFile" className="col-sm-2 control-label">Image</label>
              <div className="col-sm-10">
                  <input type="file" id="inputFile" ref="fileUpload" accept="image/*" onChange={this.onFileUpload.bind(this)} />
                  <br />
                  {
                    this.state.image ? <SmartImage src={this.state.image} /> : null
                  }
              </div>
          </div>

          <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">{this.state.posting ? "Posting..." : "Post"}</button>
              </div>
          </div>

      </form>
    </div>
  }
}