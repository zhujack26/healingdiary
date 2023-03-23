export const wordcloudHTML = `
<!DOCTYPE html>
<html>
<head>
	<title>Word Cloud Example</title>
	<style>
		.cloud-container {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			height: 400px;
			max-width: 800px;
			margin: auto;
			background-color: #f7f7f7;
			border: 1px solid #ddd;
			box-shadow: 0 0 10px #ddd;
		}

		.cloud-container span {
			display: inline-block;
			margin: 5px;
			font-size: 12px;
			color: #333;
			cursor: pointer;
			transition: all 0.2s ease-in-out;
		}

		.cloud-container span:hover {
			transform: scale(1.1);
			font-size: 18px;
			color: #666;
		}
	</style>
</head>
<body>
	<div class="cloud-container"></div>
	<script>
		let words = [
			{ text: "apple", size: 50 },
			{ text: "banana", size: 40 },
			{ text: "cherry", size: 30 },
			{ text: "date", size: 20 },
			{ text: "elderberry", size: 22 },
			{ text: "fig", size: 11 }
		];

		var container = document.querySelector('.cloud-container');
		var colors = ['#333', '#666', '#999', '#ccc', '#ddd', '#eee'];

		words.forEach(function(word) {
			var span = document.createElement('span');
			span.textContent = word.text;
			span.style.fontSize = word.size + 'px';
			span.style.color = colors[Math.floor(Math.random() * colors.length)];
			container.appendChild(span);
		});
	</script>
</body>
</html>
`;
