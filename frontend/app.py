from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('contact.html')


@app.route('/submit-contact', methods=['POST'])
def submit_contact():

    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    event_type = request.form.get('event-type')
    event_date = request.form.get('event-date')
    details = request.form.get('details')

    with open('submissions.csv', 'a', encoding='utf-8') as f:
        f.write(
            f'"{name}","{email}","{phone}","{event_type}","{event_date}","{details}"\n'
        )

    print(
        "New submission:",
        name,
        email,
        phone,
        event_type,
        event_date
    )

    return redirect(url_for('thank_you'))


@app.route('/thank-you')
def thank_you():
    return "Thanks!"


if __name__ == '__main__':
    app.run(debug=True)