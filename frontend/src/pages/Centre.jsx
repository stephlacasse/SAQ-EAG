import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCentres } from '../contexts/CentresContext';
import { useAuth } from '../contexts/AuthContext';
import {
  createMessage,
  deleteMessage,
  createFerie,
  deleteFerie,
  toggleMessage,
  createMessageFermeture,
  deleteMessageFermeture,
  toggleMessageFermeture,
  createMessageAttente,
  deleteMessageAttente,
  toggleMessageAttente,
} from '../scripts/apiUtils';
import './Centre.css';
 
const useBilingualMessages = import.meta.env.VITE_USE_BILINGUAL_MESSAGES === 'true';
 
const Centre = () => {
  const { centerId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { fetchCentre, selectedCentre } = useCentres();
  const { user } = useAuth();
 
  const [dates, setDates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newMessageFr, setNewMessageFr] = useState('');
  const [newMessageEn, setNewMessageEn] = useState('');
  const [messagesFermeture, setMessagesFermeture] = useState([]);
  const [newMessageFermeture, setNewMessageFermeture] = useState('');
  const [newMessageFermetureFr, setNewMessageFermetureFr] = useState('');
  const [newMessageFermetureEn, setNewMessageFermetureEn] = useState('');
 
  // State for wait-line messages
  const [messagesAttente, setMessagesAttente] = useState([]);
  const [newMessageAttente, setNewMessageAttente] = useState('');
  const [newMessageAttenteFr, setNewMessageAttenteFr] = useState('');
  const [newMessageAttenteEn, setNewMessageAttenteEn] = useState('');
 
 
  // Fetch centre on component mount or when centerId/user changes
  useEffect(() => {
    setIsLoading(true);
    if (user) {
      fetchCentre(centerId)
        .finally(() => setIsLoading(false));
    }
  }, [centerId, user]);
 
  // Update local state when the centre data is loaded
  useEffect(() => {
    if (selectedCentre) {
      setDates(selectedCentre.Ferie?.[0]?.Dates || []);
      setMessages(selectedCentre.MessagesUrgences || []);
      setMessagesFermeture(selectedCentre.MessagesFermeture || []);
      setMessagesAttente(selectedCentre.MessagesAttente || []);
    } else {
      setTimeout(()=>{
        console.log("Sleep 2s");
        if (user) {
          fetchCentre(centerId)
            .finally(() => setIsLoading(false));
        }
      }, 2)
    }
  }, [selectedCentre]);
 
  // Handler to add a new ferie date using API
  const handleAddDate = async () => {
    if (!newDate) return;
    try {
      await createFerie(centerId, newDate);
      await fetchCentre(centerId);
      setNewDate('');
    } catch (error) {
      console.error('Error adding date:', error);
      alert('Failed to add date');
    }
  };
 
  // Handler to delete a ferie date using API
  const handleDeleteDate = async (date) => {
    if (!window.confirm("Are you sure you want to delete this date?")) {
        return; // User canceled the deletion
    }
 
    try {
      await deleteFerie(centerId, date);
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error deleting date:', error);
      alert('Failed to delete date');
    }
  };
 
  // Handler to add a new message using API
  const handleAddMessage = async () => {
    try {
      if (useBilingualMessages) {
        if (!newMessageFr || !newMessageEn) return;
        await createMessage(centerId, { message_fr: newMessageFr, message_en: newMessageEn });
        setNewMessageFr('');
        setNewMessageEn('');
      } else {
        if (!newMessage) return;
        await createMessage(centerId, { message: newMessage });
        setNewMessage('');
      }
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error adding message:', error);
      alert('Failed to add message');
    }
  };
 
  // Handler to delete a message using API
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return; // User canceled the deletion
    }
   
    try {
      await deleteMessage(centerId, id);
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };
 
  // Handler to toggle a message using API
  const handleToggleMessage = async (id) => {
    try {
      await toggleMessage(centerId, id);
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error toggling message:', error);
      alert('Failed to toggle message');
    }
  };
 
  // --- Fermeture Message Handlers ---
 
  const handleAddMessageFermeture = async () => {
    try {
      if (useBilingualMessages) {
        if (!newMessageFermetureFr || !newMessageFermetureEn) return;
        await createMessageFermeture(centerId, { message_fr: newMessageFermetureFr, message_en: newMessageFermetureEn });
        setNewMessageFermetureFr('');
        setNewMessageFermetureEn('');
      } else {
        if (!newMessageFermeture) return;
        await createMessageFermeture(centerId, { message: newMessageFermeture });
        setNewMessageFermeture('');
      }
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error adding fermeture message:', error);
      alert('Failed to add fermeture message');
    }
  };
 
  const handleDeleteMessageFermeture = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fermeture message?")) {
      return; // User canceled the deletion
    }
   
    try {
      await deleteMessageFermeture(centerId, id);
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error deleting fermeture message:', error);
      alert('Failed to delete fermeture message');
    }
  };
 
  const handleToggleMessageFermeture = async (id) => {
    try {
      await toggleMessageFermeture(centerId, id);
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error toggling fermeture message:', error);
      alert('Failed to toggle fermeture message');
    }
  };
 
  // --- End Fermeture Message Handlers ---
 
  // --- Wait-Line Message Handlers ---
 
  const handleAddMessageAttente = async () => {
    try {
      if (useBilingualMessages) {
        if (!newMessageAttenteFr || !newMessageAttenteEn) return;
        await createMessageAttente(centerId, { message_fr: newMessageAttenteFr, message_en: newMessageAttenteEn });
        setNewMessageAttenteFr('');
        setNewMessageAttenteEn('');
      } else {
        if (!newMessageAttente) return;
        await createMessageAttente(centerId, { message: newMessageAttente });
        setNewMessageAttente('');
      }
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error adding wait-line message:', error);
      alert('Failed to add wait-line message');
    }
  };
 
  const handleDeleteMessageAttente = async (id) => {
    if (!window.confirm("Are you sure you want to delete this wait-line message?")) {
      return; // User canceled the deletion
    }
   
    try {
      await deleteMessageAttente(centerId, id);
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error deleting wait-line message:', error);
      alert('Failed to delete wait-line message');
    }
  };
 
  const handleToggleMessageAttente = async (id) => {
    try {
      await toggleMessageAttente(centerId, id);
      await fetchCentre(centerId);
    } catch (error) {
      console.error('Error toggling wait-line message:', error);
      alert('Failed to toggle wait-line message');
    }
  };
 
  // --- End Wait-Line Message Handlers ---
 
 
  if (isLoading) return <div className="loading">Loading...</div>;
  if (!selectedCentre) return <div className="no-data">No centre data available</div>;
 
  return (
    <div className="page-content">
      <div className="centre-layout">
        <div className="centre-content">
          <div className="centre-header">
            <h1>{centerId}</h1>
          </div>
 
          {/* Dates Section */}
          <div className="dates-section">
            <h2>Dates de Ferie</h2>
            <ul>
              {dates.map((date, index) => (
                <li key={index}>
                  {date}
                  <button
                    className="remove-button"
                    onClick={() => handleDeleteDate(date)}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="date"
              lang="fr"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <button onClick={handleAddDate}>Ajouter Date</button>
          </div>
 
          {/* Emergency Messages Section */}
          <div className="messages-section">
            <h2>Messages d'urgence</h2>
            <ul>
              {messages.map((msg) => (
                <li key={msg.id} className='message-item'>
                  <input
                    type="checkbox"
                    checked={msg.actif}
                    onChange={() => handleToggleMessage(msg.id)}
                    style={{"width":"20px"}}
                  />
                  <div>
                    {useBilingualMessages ? (
                      <>
                        <p><strong>FR:</strong> {msg.message_fr}</p>
                        <p><strong>EN:</strong> {msg.message_en}</p>
                      </>
                    ) : (
                      <p>{msg.message}</p>
                    )}
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleDeleteMessage(msg.id)}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
            {useBilingualMessages ? (
              <>
                <input
                  type="text"
                  placeholder="Nouveau message (FR)..."
                  value={newMessageFr}
                  onChange={(e) => setNewMessageFr(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="New message (EN)..."
                  value={newMessageEn}
                  onChange={(e) => setNewMessageEn(e.target.value)}
                />
              </>
            ) : (
              <input
                type="text"
                placeholder="New message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            )}
            <button onClick={handleAddMessage}>Ajouter Message</button>
          </div>
 
          {/* Fermeture Messages Section */}
          <div className="messages-section">
            <h2>Messages de fermeture</h2>
            <ul>
              {messagesFermeture.map((msg) => (
                <li key={msg.id} className='message-item'>
                  <input
                    type="checkbox"
                    checked={msg.actif}
                    onChange={() => handleToggleMessageFermeture(msg.id)}
                    style={{"width":"20px"}}
                  />
                  <div>
                     {useBilingualMessages ? (
                      <>
                        <p><strong>FR:</strong> {msg.message_fr}</p>
                        <p><strong>EN:</strong> {msg.message_en}</p>
                      </>
                    ) : (
                      <p>{msg.message}</p>
                    )}
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleDeleteMessageFermeture(msg.id)}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
             {useBilingualMessages ? (
              <>
                <input
                  type="text"
                  placeholder="Nouveau message fermeture (FR)..."
                  value={newMessageFermetureFr}
                  onChange={(e) => setNewMessageFermetureFr(e.target.value)}
                />
                 <input
                  type="text"
                  placeholder="New message fermeture (EN)..."
                  value={newMessageFermetureEn}
                  onChange={(e) => setNewMessageFermetureEn(e.target.value)}
                />
              </>
            ) : (
              <input
                type="text"
                placeholder="Nouveau message fermeture..."
                value={newMessageFermeture}
                onChange={(e) => setNewMessageFermeture(e.target.value)}
              />
            )}
            <button onClick={handleAddMessageFermeture}>Ajouter Message Fermeture</button>
          </div>
 
          {/* Wait-Line Messages Section */}
          <div className="messages-section">
            <h2>Messages d'attente</h2>
            <ul>
              {messagesAttente.map((msg) => (
                <li key={msg.id} className='message-item'>
                  <input
                    type="checkbox"
                    checked={msg.actif}
                    onChange={() => handleToggleMessageAttente(msg.id)}
                    style={{"width":"20px"}}
                  />
                  <div>
                     {useBilingualMessages ? (
                      <>
                        <p><strong>FR:</strong> {msg.message_fr}</p>
                        <p><strong>EN:</strong> {msg.message_en}</p>
                      </>
                    ) : (
                      <p>{msg.message}</p>
                    )}
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleDeleteMessageAttente(msg.id)}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
            {useBilingualMessages ? (
              <>
                <input
                  type="text"
                  placeholder="Nouveau message attente (FR)..."
                  value={newMessageAttenteFr}
                  onChange={(e) => setNewMessageAttenteFr(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="New message attente (EN)..."
                  value={newMessageAttenteEn}
                  onChange={(e) => setNewMessageAttenteEn(e.target.value)}
                />
              </>
            ) : (
              <input
                type="text"
                placeholder="Nouveau message attente..."
                value={newMessageAttente}
                onChange={(e) => setNewMessageAttente(e.target.value)}
              />
            )}
            <button onClick={handleAddMessageAttente}>Ajouter Message Attente</button>
          </div>
 
        </div>
      </div>
    </div>
  );
};
 
export default Centre;