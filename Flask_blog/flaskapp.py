from flask import Flask, render_template
app = Flask(__name__)

posts = [
    {
        'author': 'kaushal k',
        'title': 'Blog post 1',
        'content': 'First Post content',
        'date_posted': 'April 20, 2020'
    },

    {
        'author': 'Pinkal k',
        'title': 'Blog post 2',
        'content': 'First Post content',
        'date_posted': 'April 22, 2020'
    }
]

@app.route("/")
@app.route("/home")
def hello():
    return render_template('home.html', posts=posts)

@app.route("/about")
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.run(debug=True)