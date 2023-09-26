import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuidv4(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
    favoriteItem: '',
  },
  {
    id: uuidv4(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
    favoriteList: [],
    showFavoriteItems: false,
    nonFavoriteList: initialContactsList,
  }

  componentDidMount() {
    this.addToList()
  }

  onAddContact = event => {
    event.preventDefault()
    const {name, mobileNo} = this.state
    const newContact = {
      id: uuidv4(),
      name,
      mobileNo,
      isFavorite: false,
    }

    this.setState(prevState => ({
      contactsList: [...prevState.contactsList, newContact],
      mobileNo: '',
      name: '',
    }))
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  FavoriteItem = id => {
    console.log(id)
    const {contactsList, favoriteList} = this.state
    console.log(contactsList)
    console.log(favoriteList)
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (eachContact.id === id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))

    this.setState(prevState => ({
      favoriteList: prevState.contactsList.filter(eachContact => {
        if (eachContact.isFavorite === true) {
          return eachContact
        }
        return null
      }),
    }))

    this.setState(prevState => ({
      nonFavoriteList: prevState.contactsList.filter(eachContact => {
        if (eachContact.isFavorite === false) {
          return eachContact
        }
        return null
      }),
    }))
  }

  addToList = () => {
    const {favoriteList} = this.state
    localStorage.setItem('favorite', JSON.stringify(favoriteList))
  }

  showFavoriteItemsList = () => {
    this.setState(prevState => ({
      showFavoriteItems: !prevState.showFavoriteItems,
    }))
  }

  render() {
    const {
      name,
      mobileNo,
      favoriteList,
      showFavoriteItems,
      nonFavoriteList,
    } = this.state
    console.log(favoriteList)
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
              required
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
              required
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {nonFavoriteList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                FavoriteItem={this.FavoriteItem}
              />
            ))}
          </ul>
          {favoriteList.length !== 0 && (
            <>
              <button
                type="button"
                onClick={this.showFavoriteItemsList}
                className="button"
              >
                Favorite List
              </button>
              <hr className="separator" />
            </>
          )}

          {showFavoriteItems &&
            favoriteList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                FavoriteItem={this.FavoriteItem}
              />
            ))}
        </div>
      </div>
    )
  }
}

export default App
