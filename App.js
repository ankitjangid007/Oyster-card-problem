import OysterCard from './OysterCard'

let card = new OysterCard();

card.setCredit(30);

card.swipeIn(OysterCard.STATIONS.Holborn);
card.setNewJourney(OysterCard.STATIONS.Aldgate);
card.swipeOut();

card.setBusJourney();

card.swipeIn(OysterCard.STATIONS.EarlsCourt);
card.setNewJourney(OysterCard.STATIONS.Hammersmith);
card.swipeOut();

var credit = card.getCredit().toFixed(2);
console.log('Remaning Credit: £', credit);

export default App