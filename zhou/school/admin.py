from django.contrib import admin

from .models import Clazz, Term, TermClazz


admin.site.register(Clazz)
admin.site.register(Term)
admin.site.register(TermClazz)
