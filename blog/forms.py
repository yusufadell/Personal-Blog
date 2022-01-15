from django import forms
from .models import Comment


class EmailPostForm(forms.Form):
    name = forms.CharField(max_length=25)
    email = forms.EmailField()
    to = forms.EmailField()
    comments = forms.CharField(required=False, widget=forms.Textarea)

    widgets = {
        'comments': forms.Textarea(attrs={'placeholder': 'add yout comment', 'class': 'form-control border border-gray-300-gray', 'data-bind-characters-target': '#charactersRemaining', 'maxlength': '1000'}),
        'name': forms.TextInput(attrs={'class': 'form-control border border-gray-300-gray'}),
        'email': forms.TextInput(attrs={'class': 'form-control border border-gray-300-gray'}),
        'to': forms.TextInput(attrs={'class': 'form-control border border-gray-300-gray'}),
    }


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('name', 'email', 'body')
        widgets = {
            'body': forms.Textarea(attrs={'placeholder': 'add yout comment', 'class': 'form-control border border-gray-300-gray', 'data-bind-characters-target': '#charactersRemaining', 'maxlength': '1000'}),
            'name': forms.TextInput(attrs={'class': 'form-control border border-gray-300-gray'}),
            'email': forms.TextInput(attrs={'class': 'form-control border border-gray-300-gray'})
        }
