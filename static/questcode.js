var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var convert_to_code = function(key, count) {
	var text = "";
	var key = parseInt(key)
	var key_high = Math.floor(key / chars.length);
	var key_low = key % chars.length;
	var chain = [chars[key_high], chars[key_low]];
	for (var i = 0; i < count.length; i++) {
		if (count[i] >= chars.length) {
			if (key == 214) {
				chain.push("=");
			} else if (key == 221) {	
				chain.push("=");			
				chain.push(chars[Math.floor(count[i] / chars.length)]);
				chain.push(chars[count[i] % chars.length]);
			}
		} else {
			chain.push(chars[count[i]]);
		}
	}
	chain.reverse();
	code = chain.join("");
	code_size = code.length;
	return code_size + code
}

var decode_code = function(code) {
	var code_list = [];
	var key = 0;
	while (key < code.length) {
		var text = "";
		var size = parseInt(code[key]);
		key += 1;
		for (var i = 0; i < size; i++) {
			text += code[key+i];
		}
		text = text.split("")
		text.reverse()
		var quest_code = "" + (chars.indexOf(text[0]) * chars.length + chars.indexOf(text[1]))
		var quest_count = [];
		for (var i = 2; i < text.length; i++) {
			if (text[i] == "=") {
				if (quest_code == "214") {
					quest_count.push(chars.length);
				} else if (quest_code == "221") {
					count_high = chars.indexOf(text[i+1]);
					count_low = chars.indexOf(text[i+2]);
					quest_count.push(count_high * chars.length + count_low);
					break
				}
			} else {
				quest_count.push(chars.indexOf(text[i]))
			}
		}
		code_list.push([quest_code, quest_count])
		key += size;
	}
	return code_list;
}
