
import React from 'react';

export default class NotificationScreen extends React.Component {
  render() {
    return <div>
      <h4>Notifications</h4>
      <table className="table">
        <tbody>
          {
            [1,2,3,4,5].map((i) => 
              <div key={i}>
                <p><strong>user</strong></p>
                <p>lorem ipsum dolar set amet</p>
              </div>
            )
          }
        </tbody>
      </table>
    </div>
  }
}