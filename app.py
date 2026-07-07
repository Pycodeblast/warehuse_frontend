import streamlit as st
from utils.api import login

st.set_page_config(
    page_title="Warehouse AI",
    page_icon="🤖",
    layout="wide"
)

# ---------- SESSION ----------
if "token" not in st.session_state:
    st.session_state.token = None

# ---------- LOGIN ----------
if st.session_state.token is None:

    col1, col2, col3 = st.columns([1,2,1])

    with col2:

        st.title("🤖 Warehouse AI")

        st.caption("AI Powered Warehouse Management")

        email = st.text_input("Email")

        password = st.text_input(
            "Password",
            type="password"
        )

        if st.button("Login", use_container_width=True):

            response = login(email, password)

            if response.status_code == 200:

                token = response.json()["access_token"]

                st.session_state.token = token

                st.success("Login Successful")

                st.rerun()

            else:

                st.error("Invalid Email or Password")

# ---------- DASHBOARD ----------
else:

    st.success("Logged In Successfully")

    st.write("Dashboard will be built next.")