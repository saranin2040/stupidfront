import React from 'react';
import './FriendRequestsPage.css';

class FriendRequestsPage extends React.Component {
    state = {
        myRequests: ['Friend1', 'Friend2', 'Friend3'],
        requestsToMe: ['Friend4', 'Friend5', 'Friend6'],
    };

    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="title">З<span className="rainbow-text">А</span>Я<span className="rainbow-text">В</span>К<span className="rainbow-text">И</span></h1>
                    <h2 className="sub-title">Люди, которых вы хотите добавить в друзья:</h2>
                    <ul className="friend-list">
                        {this.state.myRequests.map((friend, index) => (
                            <li key={index} className="friend-list-item">
                                {friend}
                                <button className="cancel-button">отмена</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="sub-title">Люди, которые хотят добавить вас в друзья:</h2>
                    <ul className="friend-list">
                        {this.state.requestsToMe.map((friend, index) => (
                            <li key={index} className="friend-list-item">
                                {friend}
                                <button className="add-button">принять</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default FriendRequestsPage;
