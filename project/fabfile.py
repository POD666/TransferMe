from fabric.api import local


def help():
    print ("""
        Commands:
			'updatedb'   - create/update db and do all migrations
            'rebuild_frontend' - gupl + bower
			'watch'        - 'gulp dev'
			'clear'      - 'delete all precompiled *.pyc files in project'
			'all'        - 'updatedb' + 'rebuild_frontend'
			'run'        - 'python manage.py runserver'
		""")


def start():
	local('npm install gulp -g')
	local('npm install bower -g')
	local('npm install')


def updatedb():
	local('pip install -r requirements.txt')
	local('./manage.py syncdb')
	local('./manage.py migrate')
	local('./manage.py loaddata fixtures/allauth.json')
	local('./manage.py loaddata fixtures/places.json')


def rebuild_frontend():
	local('npm install')
	local('gulp bower')
	local('gulp default')


def index():
	local('./manage.py rebuild_index')


def watch():
	local('gulp dev')

def clear():
	local('find . -name \*.pyc -delete')
	#delete all precompiled *.pyc files in project

def all():
	clear()
	updatedb()
	rebuild_frontend()


def run():
	local('./manage.py runserver --insecure')
