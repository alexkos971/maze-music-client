'use client';

import AuthWrap from "@components/AuthWrap";
import Form from "@components/UI/Form";
import { Email, Password } from "@components/ui/Field";
import Button from "@components/ui/Button";

const SignIn = () => {
    return (
        <AuthWrap>
            <h1 className="block-title">Sign In</h1>

            <Form>
                <Email name="email" placeholder="Email"/>
                <Password name="password" placeholder="Password"/>

                <div className="flex items-center justify-between mt-6">
                    <Button type="submit" color="green" size="normal">Sign In</Button>

                    <span className="flex items-center gap-3 justify-center">
                        SIgn In with google
                    </span>
                </div>
            </Form>
        </AuthWrap>
    );
}

export default SignIn;