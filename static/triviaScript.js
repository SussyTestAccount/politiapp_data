$(document).ready(function() {
    const triviaQuestions = [
        {"id": 1, "question": "What was the first Capitol of the US?", "options": ["Beijing", "New York", "Washington D.C.", "Philadelphia"], "answer": "Philadelphia"},
        {"id": 2, "question": "How many rights are in the Bill of Rights?", "options": ["1", "5", "10", "15"], "answer": "10"},
        {"id": 3, "question": "What scandal caused President Nixon to resign?", "options": ["Gamergate", "Watergate", "Zimmermann Telegram", "Credit Mobilier"], "answer": "Watergate"}
        {"id": 4, "question": "Which 5 words head the US Constitution?", "options": ["A spirit is haunting Europe...", "We, the citizens of America...", "Four score and seven years...", "We the people of the..."], "answer": "We the people of the..."},
        {"id": 5, "question": "What is it called when the President refuses to accept a bill?", "options": ["Vetoing", "Filibuster", "Cleanse", "Reject"], "answer": "Vetoing"},
        {"id": 6, "question": "Who was a notable 'muckraker' during the political Progressive Era?", "options": ["Jacob Riis", "Janice Rizz", "Joe Rogan", "Jane Riemann"], "answer": "Jacob Riis"}
    ];

    function loadQuestions() {
        triviaQuestions.forEach(question => {
            $('#question-list').append(`<li><a href="#" class="question-link" data-id="${question.id}">${question.question}</a></li>`);
        });

        $('.question-link').on('click', function(e) {
            e.preventDefault();
            const questionId = $(this).data('id');
            loadQuestion(questionId);
        });
    }

    function loadQuestion(questionId) {
        $('#question-list').hide();
        $.getJSON(`/get_question/${questionId}`, function(question) {
            $('#question-text').text(question.question);
            $('#options-container').empty();
            question.options.forEach(option => {
                $('#options-container').append(`<div><input type="radio" name="option" value="${option}" required> ${option}</div>`);
            });
            $('#question-container').show();
            $('#question-form').off('submit').on('submit', function(e) {
                e.preventDefault();
                const selectedOption = $('input[name="option"]:checked').val();
                checkAnswer(question.id, selectedOption);
            });
        });
    }

    function checkAnswer(questionId, selectedOption) {
        $.ajax({
            type: 'POST',
            url: '/check_answer',
            contentType: 'application/json',
            data: JSON.stringify({question_id: questionId, selected_option: selectedOption}),
            success: function(response) {
                $('#feedback').show().text(response.correct ? 'Correct!' : `Incorrect! The correct answer is ${response.answer}.`);
                $('#back-link').show().on('click', function() {
                    $('#question-container').hide();
                    $('#feedback').hide();
                    $('#back-link').hide();
                    $('#question-list').show();
                });
            }
        });
    }

    loadQuestions();
});
