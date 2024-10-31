document.getElementById('vote-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const selectedVote = document.querySelector('input[name="vote"]:checked').value;
    document.getElementById('result-message').textContent = `您投票的選項是：${selectedVote}`;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('vote-form').reset();
});
