module.exports =  function () {
	var trelloMapper = {}

	trelloMapper.map = function(trelloReq) {
		return {
		   'source' : 'trello',
	       'user' : {name : trelloReq.action.memberCreator.username},
	       'message' : trelloMapper.messageFormat(trelloReq.action.type, trelloReq.action),
	       'date' : trelloReq.action.date,
	       'img' : 'trello.jpg',
	       'detail' : trelloMapper.detailFormat(trelloReq.action.type, trelloReq.action),
   		}	
   };
   trelloMapper.detailFormat = function(message, action) {
   		return {'message': 'detailMessage'}
   }


   trelloMapper.messageFormat = function(message, action) {
   		console.log("ACTION!" + JSON.stringify(action, null, 2));
   		if(action.data.card) {
   			var cardName = action.data.card.name;
   		}

   		if(action.data.list) {
   			var listName = action.data.list.name;
   		}

   		switch(message) {
   			//update actions
		    case 'updateCard':
		        return 'Card \"' + cardName + '\" was updated!';
		    case 'updateList':
		        return 'List \"' + listName + '\" was updated!';
		    //create actions
		    case 'createCard':
		        return 'Card \"' + cardName + '\" was created!';
		    case 'createList':
		        return 'List \"' + listName + '\" was created!';
		    //card actions
		    case 'commentCard':
		    	return 'Card \"' + cardName + '\" was commented!';
		   	//delete actions
		   	case 'deleteCard':
		   		return 'Card \"' + cardName + '\" was deleted!';

		   	//members actions
		   	case 'addMemberToCard':
		   		return 'Member was added to Card \"' + cardName + '\"';
		   	case 'removeMemberFromCard':
		   		return 'Member was removed from Card \"' + cardName + '\"';

		   	//label actions
		   	case 'addLabelToCard':
		   		return 'Label was added to Card \"' + cardName + '\"';
		   	case 'removeLabelFromCard':
		   		return 'Label was removed from Card \"' + cardName + '\"';
		    default:
		        return '\"I would love to change the world, but they won\'t give me the source code\"';
		}
   }
    
  return trelloMapper;
}
