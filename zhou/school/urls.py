# from django.conf.urls import url
from django.urls import path
from .views import SchoolTermApiView, SchoolTermDetailApiView

urlpatterns = [
    path('calendar/<int:pk>', SchoolTermDetailApiView.as_view(), name='school-calendar-edit'),
    path('calendar', SchoolTermApiView.as_view(), name='school-calendar'),
]
