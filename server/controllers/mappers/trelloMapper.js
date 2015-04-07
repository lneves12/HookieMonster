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
   		var detailMessage = '';
   		var cardName = '-';
   		var listName = '.';
   		switch(message) {
   			//update actions
		    case 'updateCard':
		        if(action.data.listAfter && action.data.listBefore){
		        	detailMessage = 'Card \"' + action.data.card.name + '\" was moved from \"' + action.data.listBefore.name + '\" to \"' + action.data.listAfter.name + '\"';
		        }
		        else if(action.data.old){
		        	detailMessage = 'Due date \"' + action.data.card.due + '\" was added to card \"' + action.data.card.name + '\"';
		        }
		        else {
					detailMessage = 'Card was updated!';
		        }
		        break;
		    case 'updateList':
		        detailMessage = 'List \"' + action.data.list.name + '\" was moved';
		        break;

		    //create actions
		    case 'createCard':
		        detailMessage = 'New card \"' + action.data.card.name + '\" created on list \"' + action.data.list.name + '\"';
		        break;
		    case 'createList':
		        detailMessage = 'New list \"' + action.data.list.name + '\" created';
		        break;

		    //card actions
		    case 'commentCard':
		    	detailMessage = 'New comment \"' + action.data.text + '\" on card \"' + action.data.card.name + '\"';
		    	break;

		   	//delete actions
		   	case 'deleteCard':
		   		detailMessage = 'Card was deleted from list \"' + action.data.list.name + '\"';
		   		break;

		   	//members actions
		   	case 'addMemberToCard':
		   		detailMessage = 'New member \"' + action.member.username + '\" was added to card \"' + action.data.card.name + '\"';
		   		break;
		   	case 'removeMemberFromCard':
		   		detailMessage = 'Member \"' + action.member.username + '\" was removed from Card \"' + action.data.card.name + '\"';
		   		break;

		   	//label actions
		   	case 'addLabelToCard':
		   		detailMessage = 'Label was added to Card \"' + action.data.card.name + '\"';
		   		break;
		   	case 'removeLabelFromCard':
		   		detailMessage = 'Label was removed from Card \"' + action.data.card.name + '\"';
		   		break;
		    default:
		        detailMessage = '42';
		}
		return {'message': detailMessage}
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
		   		return 'Card was deleted!';

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
