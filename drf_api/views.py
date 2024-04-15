from rest_framework.decorators import api_view
from rest_framework.response import Response


# copied from DRF Cheat sheet
@api_view()
def root_route(request):
    return Response(
        {"message": "Welcome to the Birdie django rest framework API!"}
        )
