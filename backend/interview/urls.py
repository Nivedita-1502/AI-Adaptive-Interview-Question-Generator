from django.urls import path
from . import views

urlpatterns = [

    # Frontend pages
    path("", views.login_page),
    path("setup/", views.setup_page),
    path("interview/", views.interview_page),
    path("result/", views.result_page),

    # Backend APIs
    path("api/subjects/", views.get_subjects),
    path("api/start/", views.start_interview),
    path("api/question/", views.get_question),
    path("api/evaluate/", views.evaluate),
]