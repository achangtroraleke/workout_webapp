from django.contrib import admin
from .models import CustomUser, Workout, Exercise, WorkoutLog
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Workout)
admin.site.register(WorkoutLog)
admin.site.register(Exercise)