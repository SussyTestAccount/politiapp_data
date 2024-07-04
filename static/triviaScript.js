$(document).ready(function() {
    const triviaQuestions = [
        {"id": 1, "question": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Rome"], "answer": "Paris"},
        {"id": 2, "question": "Who wrote 'To Kill a Mockingbird'?", "options": ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"], "answer": "Harper Lee"},
        {"id": 3, "question": "What is the largest planet in our solar system?", "options": ["Earth", "Jupiter", "Saturn", "Mars"], "answer": "Jupiter"}
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
